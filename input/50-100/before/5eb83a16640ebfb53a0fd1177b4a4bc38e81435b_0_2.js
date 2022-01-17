function() {
   		if($("#observationWithNoFlagFilterButton").hasClass('active')){
   			return false;
   		}
		$("#observationFlagFilter").val('false')
		$("#observationFlaggedButton").removeClass('active')
		$("#observationWithNoFlagFilterButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, 0);
        return false;
	}