function(){
   		setActiveTag($(this).contents().first().text());
		updateGallery(undefined, undefined, 0);
		return false;
   }