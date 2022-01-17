function(src, evt)
{
    ViewItemContainer.superClass.doAction.call(this, src, evt);   

    if (evt.type == "appendedItem")
    {
        this.appendViewItemAndChildren(evt.item);
    }
    else if (evt.type == "removeItem")
    {
        // Abandon the view of this item
        
        // First remove the viewItem from the item's action listeners
        var viewItem = this.containedItems.childNodes[evt.itemIndex];
        viewItem.removeActionListeners();
        
        // Remove the viewItem
        this.containedItems.removeChildByIndex(evt.itemIndex);
        this.auxGroup.removeChildByIndex(evt.itemIndex);
    }
}