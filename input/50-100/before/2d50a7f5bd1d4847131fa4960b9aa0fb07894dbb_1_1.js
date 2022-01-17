function(event) {
										localImage = event.media;
										if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
											// display selected pic on profile window
											photoLogo.image = localImage;
											winProfile.add(photoLogo);
										}
									}