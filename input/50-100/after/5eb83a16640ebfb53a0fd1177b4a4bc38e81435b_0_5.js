function(){
		if($(this).hasClass('active')){
			return false;
		}
		$('#speciesGroupFilter button.active').removeClass('active');
    	$(this).addClass('active');
    	updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
    	return false;
 	}