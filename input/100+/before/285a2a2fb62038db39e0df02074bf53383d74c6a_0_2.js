function(focusIndex, mediaId)
{
	if(focusIndex in this.descriptors)
	{
		var currentDescriptor = this.descriptors[focusIndex];
		var mediaIndex = currentDescriptor.mediaArray.indexOf(mediaId);
		if(mediaIndex != -1)
		{
			currentDescriptor.mediaArray.splice(mediaIndex,1);
			this.unbindMouseEvents(mediaId);
		}
						
		if(focusIndex == this.currentFocusIndex)
			if(currentDescriptor.mediaArray.length == 0)
				{
					this.focusIndexArray.splice(this.focusIndexArray.indexOf(focusIndex),1);
					
					if(this.focusIndexArray.length == 0)
						this.setCurrentFocus(undefined);
					else
						{
							this.focusIndexArray.sort(this.sortFunction);
							this.setCurrentFocus(this.focusIndexArray[0])
						}
					
				}
	}
	
	
}