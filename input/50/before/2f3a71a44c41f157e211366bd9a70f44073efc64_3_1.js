function(isVisible)
{
    // Always override if parameter says it's invisible.
    if (this.modelItem.params.isInvisible && !this.modelItem.cellContents.model.showInvisible)
        isVisible = false;
    
    this.itemGraphics.setVisible(isVisible);
}