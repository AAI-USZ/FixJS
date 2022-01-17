function()

{

    this.owner = null;

    for (var i = 0; i < this.myItems.length; ++i)

    {

        this.myItems[i].cleanup();

    }

}