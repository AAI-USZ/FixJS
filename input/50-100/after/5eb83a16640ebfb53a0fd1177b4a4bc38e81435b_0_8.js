function(){
   		setActiveTag($(this).contents().first().text());
		updateGallery(undefined, window.params.queryParamsMax, window.params.offset, undefined, window.params.isGalleryUpdate);
		return false;
   }