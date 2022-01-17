function(e) {

			//get the galleryID
			var galleryID = $.data(this, 'touchtouch-gallery-id'),
				galleryOptions = $.data(this, 'touchtouch-gallery');

			e.preventDefault();

			if (galleryID !== currentGalleryID) {
				currentGalleryID = galleryID;
				overlay.toggleClass('gallery-navigation', galleryOptions.navigation);
				
				slider
				.empty()
				.off('slide.touchtouch')
				.append(placeholders);
				
				if (galleryOptions.navigation) {
					slider.on('slide.touchtouch', function (e, dir) {
						if (dir === 'next') {
							showNext();
						} else {
							showPrevious();
						}
						if (options.showCaption) {
							overlay.find('.gallery-caption span').html(items.eq(index).attr('title'));
						}
	
					});
				}
			}

			// Find the position of this image
			// in the collection

			index = items.index(this);
			$.touchTouch.showOverlay(index);
			showImage(index);
			if (options.showCaption) {
				overlay.find('.gallery-caption span').html($.attr(this, 'title'));
			}

			// Preload the next image
			preload(index+1);

			// Preload the previous
			preload(index-1);

		}