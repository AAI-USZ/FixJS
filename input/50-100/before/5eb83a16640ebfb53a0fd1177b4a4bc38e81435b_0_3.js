function() {
   		if($("#speciesNameAllButton").hasClass('active')){
   			return false;
   		}
		$("#speciesNameFilter").val('All')
		$("#speciesNameFilterButton").removeClass('active')
		$("#speciesNameAllButton").addClass('active')
		
		updateGallery(undefined, window.params.queryParamsMax, 0);
        return false;
	}