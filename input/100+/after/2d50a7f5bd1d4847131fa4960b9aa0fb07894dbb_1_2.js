function(e) {
					Ti.API.info('You selected ' + e.index);
					if (e.index == 1) {
						//obtain an image from the gallery
						Titanium.Media.openPhotoGallery({
							success : function(event) {
								localImage = event.media;
								// set image view
								Ti.API.debug('Our type was: ' + event.mediaType);
								if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
									// display selected pic on profile window
									photoLogo.image = localImage;
									winProfile.add(photoLogo);
								}
							},
							cancel : function() {// having probles, will try to solve it
								//user cancelled the action from within the photo gallery
								winProfile.open();
							}
						});
					} else {
					}
				}