f{
	if (focusIndex in this.descriptors)
	{
		var currentDescriptor = this.descriptors[focusIndex];
		
		if(currentDescriptor.mediaArray.indexOf(mediaId) == -1)
		{ 
			currentDescriptor.mediaArray.push(mediaId);
			this.bindMouseEvents(focusIndex, mediaId);
		}

		//if (! (focusIndex in this.focusIndexArray)) {
		if ($.inArray(focusIndex, this.focusIndexArray) == -1) {
			this.focusIndexArray.push(focusIndex);
		}
		
		if (this.currentFocusIndex == undefined)
			this.__setCurrentFocus(focusIndex);			
	    else if (this.currentFocusIndex == focusIndex)
			this.setMediaFocus(mediaId);
		
	}
};
