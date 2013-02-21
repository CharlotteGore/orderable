var $ = require('jquery');
var draggy = require('draggy');
var each = require('each');
var indexOf = require('indexof')


var Reorderable = function( ul , keys ){

	var self = this;

	$('body').css({
		"-webkit-user-select" : "none",
		"-moz-user-select":"none",
		"-ms-user-select":"none",
		"-o-user-select":"none",
		"user-select":"none"
	});

    var position = ul.offset();
    var height = ul.outerHeight();
    var width = ul.outerWidth();
    var lis = ul.find('li');
    var placeholder = $('<li class="placeholder"></li>');

    this.callbacks = {
    	onReorder : function(e, i){},
    	onDelete : function(e){}
    }

    var index = 0;
    var newOrder = [];
    var oldIndex = 0;
    var itemBeingMoved = 0;

    each( lis , function( li ){

    	return (function( el ){

    		if(keys){

    			el.data({_id : keys[index++]});

    		}else{
				
				el.data({ _id : index++ });

    		}

    		draggy( el )
    			.dragStart(function(){

    				itemBeingMoved = el.data()._id;

    				var currentOrder = [];

    				each(ul.find('li'), function(li){

    					currentOrder.push( $(li).data()._id );

    				});

    				oldIndex = indexOf(currentOrder, itemBeingMoved);

    				el.addClass('moving');

    				placeholder.css({ height : el.innerHeight() });

    				el.before( placeholder );

    			})
    			.dragStop(function(){

    				if(placeholder.is(':visible')){

	    				el.removeClass('moving');

	    				el.css({ position : '', top: '', left: '' });

	    				placeholder.before(el);
	    				placeholder.remove();

	    				newOrder = [];

	    				each(ul.find('li'), function(li){

	    					newOrder.push( $(li).data()._id );

	    				});

	    				var newIndex = indexOf(newOrder, itemBeingMoved)

	    				self.callbacks.onReorder(itemBeingMoved, newIndex, oldIndex, function(arr){

	    					var temp = arr.splice(oldIndex, 1)[0];
	    					arr.splice(newIndex, 0, temp);

	    					return arr;

	    				});

    				}else {

    					self.callbacks.onDelete(itemBeingMoved);

    					el.remove();

    				}

    			})
    			.dragMove(function(x, y){

    				var yPos = (position.top - y) * -1;
    				var xPos = (position.left - x) * -1;

    				var bestItem = false;


    				if(xPos < width + width){

    					placeholder.show();
    		
	    				if(yPos >= 0){

	    					each(ul[0].childNodes, function( item ){

	    						if(item.nodeType===1 && bestItem === false){

		    						var el = $(item);

		    						if(!el.is('.moving') && !el.is('.placeholder')){

		    							var offset = el.offset();
		    							offset.top = offset.top - position.top;

		    							var temp = offset.top + (el.outerHeight() / 2);

		    							if( yPos < temp ){

		    								bestItem = el;

		    							} else {


		    							}

		    						}

		    					}

	    					});

	    					

	    					if(bestItem !== false){

	    						bestItem.before(placeholder);

		    				}else{

		    					placeholder.remove();
		    					ul.append(placeholder);

		    				}

	    				}

	    				

    				} else {


    					placeholder.hide();

    				}				

    			});

    	})( $(li) );

    });

	// given an unordered list, and an array, 

	return this;

}

Reorderable.prototype = {

	onReorder : function( callback ){

		// return the ordered data.

		this.callbacks.onReorder = callback;

		return this;

	},

	onDelete : function( callback ){

		// in the event that an element is deleted,
		// return that data here..

		this.callbacks.onDelete = callback;

		return this;

	}

}

module.exports = function(ul, keys){

	return new Reorderable(ul, keys);

}