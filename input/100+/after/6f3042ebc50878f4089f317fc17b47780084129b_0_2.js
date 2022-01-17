function (data) {
				calling = false;
				if (data.text.length === 0 && data.photos.length === 0) {
					return;
				}
				for (var n = 0; n < limit; n++) {
					if (data.text[n]) {
						node_text(data.text[n], prepend);
					}
					if (data.photos[n]) {
						node_photo(data.photos[n], prepend);
					}
				}
				container.imagesLoaded(function(){
					container.masonry({
						itemSelector: '.gig-outerbox'
					});
				});
			}