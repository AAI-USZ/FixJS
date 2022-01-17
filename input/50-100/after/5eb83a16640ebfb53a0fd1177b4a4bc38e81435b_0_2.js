function() {
   		if($("#observationWithNoFlagFilterButton").hasClass('active')){
   			return false;
   		}
		$("#observationFlagFilter").val('false')
		$("#observationFlaggedButton").removeClass('active')
		$("#observationWithNoFlagFilterButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
        return false;
	}