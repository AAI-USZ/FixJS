function(focusIndex, mediaId)
{
	if($.inArray(focusIndex, this.focusIndexArray) != -1)
	{
		var currentDescriptor = this.descriptors[focusIndex];
		var mediaIndex = currentDescriptor.mediaArray.indexOf(mediaId);
		
		if(mediaIndex != -1)
		{
			currentDescriptor.mediaArray.splice(mediaIndex,1);
			this.removeMediaFocus(mediaId);
			this.unbindMouseEvents(mediaId);
		}
		
		if(currentDescriptor.mediaArray.length == 0) {
			this.focusIndexArray.splice(this.focusIndexArray.indexOf(focusIndex),1);
		}
						
		if(focusIndex == this.currentFocusIndex) {					
			if(this.focusIndexArray.length == 0) {
				this.setCurrentFocus(undefined);
			} else {
				this.focusIndexArray.sort(this.sortFunction);					
				this.setCurrentFocus(this.focusIndexArray[0])
			}
		}
	}	
}