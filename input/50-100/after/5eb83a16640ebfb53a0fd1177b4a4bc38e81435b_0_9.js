function(){
    	var oldActiveTag = $("li.tagit-choice.active");
		if(oldActiveTag){
			oldActiveTag.removeClass('active');
		}
		var oldActiveTag = $("#tc_tagcloud a.active");
		if(oldActiveTag){
			oldActiveTag.removeClass('active');
		}
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
    	return false;
    }