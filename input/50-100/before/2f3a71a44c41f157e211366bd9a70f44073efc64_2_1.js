function()
{
    // The owner could be a GridContents or a GridItem
    // If the owner is a GridItem, we are sitting on top of it.
    if (this.owner == null)
    {
        this.params.elev = 0;
    }
    else if (this.owner.params != null)
    {
        if (this.owner.params.elev != null)
            this.params.elev = this.owner.params.elev;
    
        if (this.owner.params.ht != null)
            this.params.elev += this.owner.params.ht;
    }
}