function( position ) {
		//galleryContainer.addClass('animate-sliding')
		galleryContainer.css('-webkit-transform', 'rotateY(15deg) translateX('+ (-position) +'px)');
		rotatingTimeout = setTimeout(function(){
			galleryContainer.css('-webkit-transform', 'rotateY(0deg) translateX('+ (-position) +'px)');
		}, 800);
	}