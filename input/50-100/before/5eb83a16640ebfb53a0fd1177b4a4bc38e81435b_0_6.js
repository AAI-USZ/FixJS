function(){
 		if($(this).hasClass('active')){
			return false;
		}
 		$('#habitatFilter button.active').removeClass('active');
    	$(this).addClass('active');
    	updateGallery(undefined, window.params.queryParamsMax, 0);
    	return false;
 	}