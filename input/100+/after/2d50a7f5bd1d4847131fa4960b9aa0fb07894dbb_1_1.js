function(e) {
					Ti.API.info('You selected ' + e.index);
					if (e.index == 0) {
						//from the camera
						Titanium.Media.showCamera({
							success : function(event) {
								localImage = event.media;
								if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
									// display selected pic on profile window
									photoLogo.image = localImage;
									winProfile.add(photoLogo);
								}
							},
							cancel : function() {// having problems with this...will try to solve it
								//getting image from camera was cancelled
								winProfile.open();
							},
							error : function(error) {
								//create alert
								var a = Titanium.UI.createAlertDialog({
									title : 'Camera'
								});
								// set message
								if (error.code == Titanium.Media.NO_CAMERA) {
									a.setMessage('Device does not have image recording capabilities');
								} else {
									a.setMessage('Unexpected error: ' + error.code);
								}
								// show alert
								a.show();
							},
							allowImageEditing : true,
							saveToPhotoGallery : true
						});
					} else {
					}
				}