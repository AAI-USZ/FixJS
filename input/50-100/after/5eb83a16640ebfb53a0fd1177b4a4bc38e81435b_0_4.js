function() {
		if($("#speciesNameFilterButton").hasClass('active')){
   			return false;
   		}
	    $("#speciesNameFilter").val('Unknown')
		$("#speciesNameFilterButton").addClass('active')
	    $("#speciesNameAllButton").removeClass('active')
			
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
        return false;
	}