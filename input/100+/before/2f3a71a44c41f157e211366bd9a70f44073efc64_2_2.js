function(height, doSave)
{
	this.setItemParam("ht", height, doSave);
	
	// Weight can be a function of height for some items.
	if (this.params.wtPerHt != null)
		this.params.wt = this.params.wtPerHt * height;
	
	// Update the POV of this item and each item on top of it
	var items = this.getFlattenedTree();
	for (var i = 0; i < items.length; ++i)
	{
		items[i].updateElev();
    	items[i].updatePOV();
	}
	
	// Update any items with a POV that touches this cellContents
	this.updateAffectedPOV();
}