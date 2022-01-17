function() {
   		if($("#speciesNameAllButton").hasClass('active')){
   			return false;
   		}
		$("#speciesNameFilter").val('All')
		$("#speciesNameFilterButton").removeClass('active')
		$("#speciesNameAllButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
        return false;
	}