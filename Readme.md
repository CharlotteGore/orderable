
# orderable

  Creates a drag/drop reorderable list. Callbacks for reorder and delete. Helpful utilities
  to help keep a separate array in sync with the operations performed by the user. 

## Installation

    $ component install charlottegore/orderable

## API

  To make a list reorderable via drag and drop, this is enough:

	var ul = $('ul.my-unordered-list');

	var orderable = require('orderable')( ul );

  or you can create an orderable list where each element has a custom, unique key:

  	var keys = ["one", "two", "three", "four"];

  	var orderable = require('orderable')( ul, keys );
  	// the keys are applied to each li in order.
   
### .onReorder( `callback` )

    var someArray = ['one', 'two', 'three', 'four']

    orderable.onReorder( function( uniqueItemKey, oldIndex, newIndex, helperFunction ){ 

    	// uniqueItemKey
    	// is a unique, unchanging id applied to each LI in the list.
    	// if orderable was invoked with the keys option, then this is the user defined key, otherwise
    	// it's just a number from 0 to length - 1.

    	// oldIndex 
    	// is the old position of the element.

    	// newIndex
    	// is the new position of the element.

    	// helperFunction 
    	// will apply the *same* transformation performed by the user on 
    	// any other array:

    	someArray = helperFunction( someArray );

    	// someArray === ['two', 'three', 'one', 'four']

    	// In this way you can easily sync up some other data with the orderable list without needing to mess around with the DOM. 

    })

### .onDelete( `callback` )

    orderable.onDelete( function( uniqueItemKey, oldIndex ) {

    	// fires when a user drags an element completely out of the list and lets go. 

    	// uniqueItemKey is either the automatically assigned or user-defined unique key.
    	// oldIndex is the position the list element used to be in before it was moved.
 
    })

## License

  MIT
