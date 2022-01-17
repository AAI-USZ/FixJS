function() {
			var callback,
				nextPageToLoad,
				movedToNextPage = FLICKR.gallery.moveToNextPage();
			
			// if we clicked forward and we are located on the last page then we need to preload next page from FLICKR
			if ( movedToNextPage === false ) {
				
				// showing overlay
				FLICKR.overlay.show();
				
				pageToLoad = FLICKR.gallery.getTotalPages() + 1;
				callback = function() {
					FLICKR.overlay.hide();
					FLICKR.gallery.moveToNextPage();
				};
		
				// loading next page from flickr
				FLICKR.images.loadPhotos( pageToLoad, callback);
			}
		}