function StateGridViewItem(modelItem, viewItemFactory, stateItem)
{
    this.stateItem = stateItem;
    
    StateGridViewItem.baseConstructor.call
        (this, modelItem, viewItemFactory, this.stateItem);   

    // We set the base position to be the height of the object
    // so that items that go on top of it are correctly placed
    var translateHeight = -this.modelItem.params.ht;
    this.setPosition(0, translateHeight); 
    
    this.itemGraphics.setAttribute("transform", "translate(0, " + this.modelItem.params.ht + ")");
	
	if (this.modelItem.owner != null && this.modelItem.owner.params != null && this.modelItem.owner.params.itemTags != null)
		this.stateItem.setStateBasedOnParentTag(this.modelItem.owner.params.itemTags);
}