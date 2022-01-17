function(target)

{

    if (this.owner)

    {

        this.owner.removeItem(this);

    }

    target.appendItem(this);

}