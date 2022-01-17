function(){
		if($(this).hasClass('active')){
			return false;
		}
		$('#speciesGroupFilter button.active').removeClass('active');
    	$(this).addClass('active');
    	updateGallery(undefined, window.params.queryParamsMax, 0);
    	return false;
 	}