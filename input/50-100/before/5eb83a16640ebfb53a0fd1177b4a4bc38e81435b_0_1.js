function() {
   		if($("#observationFlaggedButton").hasClass('active')){
   			return false;
   		}
		$("#observationFlagFilter").val('true')
		$("#observationWithNoFlagFilterButton").removeClass('active')
		$("#observationFlaggedButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, 0);
        return false;
	}