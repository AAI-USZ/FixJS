function(target)

{

    if (this.owner)

    {

		// Find the index

	    for (var i = 0; i < this.owner.myItems.length; ++i)

	    {

	        if (this.owner.myItems[i] == this)

	        {

				// Found the item - remove it from the current owner.

			    this.owner.myItems.splice(i, 1);

			    this.owner.tellActionListeners(this.owner, {type:"removeItem", itemIndex:i});

	            break;

	        }    

	    }

    }



	target.appendItem(this);

}