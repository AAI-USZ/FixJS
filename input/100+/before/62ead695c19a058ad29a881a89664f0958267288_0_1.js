function(){
	var rotatingTimeout = null,
		pageWidth = 940,
		galleryContainer = $( FLICKR.imageContainer );
	
	getCurrentPage = function() {
		return FLICKR.currentPage;
	};
	
	getTotalPages = function() {
		return FLICKR.pages;
	};
	
	moveToNextPage = function() {
		if ( FLICKR.pages > FLICKR.currentPage ) {
			FLICKR.currentPage = FLICKR.currentPage + 1;
			movePage();
			return FLICKR.currentPage;
		} else {
			return false;
		}
	};
	
	moveToPreviousPage = function() {
		if ( FLICKR.currentPage > 1 ) {
			FLICKR.currentPage = FLICKR.currentPage - 1;
			movePage();
			return FLICKR.currentPage;
		} else {
			return false;
		}
	};
	
	movePage = function() {
		clearTimeout( rotatingTimeout );
		var newLeftPos = getCurrentPage() * pageWidth - pageWidth;
		moveSlider( newLeftPos );
	};
	
	moveSlider = function( position ) {
		//galleryContainer.addClass('animate-sliding')
		galleryContainer.css('-webkit-transform', 'rotateY(15deg) translateX('+ (-position) +'px)');
		rotatingTimeout = setTimeout(function(){
			galleryContainer.css('-webkit-transform', 'rotateY(0deg) translateX('+ (-position) +'px)');
		}, 800);
	};
	
	return {
		getCurrentPage: getCurrentPage,
		getTotalPages: getTotalPages,
		moveToNextPage: moveToNextPage,
		moveToPreviousPage: moveToPreviousPage
	};
	
}