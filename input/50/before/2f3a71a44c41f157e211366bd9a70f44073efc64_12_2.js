function(item)

{

    for (var i = 0; i < this.myItems.length; ++i)

    {

        if (this.myItems[i] == item)

        {

            this.removeItemByIndex(i);

            break;

        }    

    }

}