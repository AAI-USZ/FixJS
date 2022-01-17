function(src, evt)
{
	if (evt.type == "click")
	{
		switch (src.src)
		{
		case "upArrowButton":
		    this.setNewHeight(this.newHeight + 5);
			break;

		case "downArrowButton":
		    this.setNewHeight(this.newHeight - 5);
			break;

		case "updateAction":
			// Commit the updates into the action

			// Update the action
			this.myAction.heightItem.setItem(this.heightItemButton.selectedItem);
			this.myAction.setHeight(this.newHeight);

			// Update the appearance
			this.setNewHeight(this.newHeight);
			break;
		}
	}
	else if (evt.type == "itemViewUpdated")
	{
		this.updateHeightEditAppearance(this.heightItemButton.selectedItem);
	}
    
	HeightActionEditor.superClass.doAction.call(this, src, evt);
}