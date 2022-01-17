function() {
			var nextPageToLoad,
				movedToNextPage = FLICKR.gallery.moveToNextPage();
			
			if ( movedToNextPage === false ) {
				pageToLoad = FLICKR.gallery.getTotalPages() + 1;
				FLICKR.images.loadPhotos( pageToLoad, function() {
					FLICKR.gallery.moveToNextPage();
					});
			}
		}