function( position ) {
		var cssTransformStart = 'rotateY(15deg) translateX('+ (-position) +'px)',
			cssTransformEnd = 'rotateY(0deg) translateX('+ (-position) +'px)';
		
		//galleryContainer.addClass('animate-sliding')
		galleryContainer.css({
			'-webkit-transform': cssTransformStart,
			'-moz-transform': cssTransformStart
		});
		rotatingTimeout = setTimeout(function(){
			galleryContainer.css({
				'-webkit-transform': cssTransformEnd,
				'-moz-transform': cssTransformEnd
			});
		}, 800);
	}