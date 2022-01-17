function() {
   		if($("#observationFlaggedButton").hasClass('active')){
   			return false;
   		}
		$("#observationFlagFilter").val('true')
		$("#observationWithNoFlagFilterButton").removeClass('active')
		$("#observationFlaggedButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
        return false;
	}