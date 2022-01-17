function(e) {
					if(e.success) {
						image = e.photos[0].urls.small_240;

						//dialog with the options of where to get an image from
						var dialog = Titanium.UI.createOptionDialog({
							title : 'Choose an image source...',
							options : ['Camera', 'Photo Gallery', 'Cancel'],
							cancel : 2
						});

						//add event listener - to show option dialog when profile pic is clicked
						dialog.addEventListener('click', function(e) {
							Ti.API.info('You selected ' + e.index);
						});

						// profile pic - click to edit
						photoLogo = Titanium.UI.createImageView({
							image : image,
							defaultImage : 'profile.png',
							width : '140dp',
							height : '133dp',
							left : '85dp',
							right : '85dp',
							top : '12dp'
						});
						winProfile.add(photoLogo);

						photoLogo.addEventListener('click', function(e) {
							dialog.show();
						});

						// instruction to direct user to click on photo to edit
						var photoInstruct = Titanium.UI.createLabel({
							width : 'auto',
							height : '15dp',
							top : '145dp',
							left : '90dp',
							color : '#D3D3D3',
							font : {
								fontSize : 10,
								fontFamily : 'Helvetica'
							},
							text : 'Click on photo to change it...'
						})
						winProfile.add(photoInstruct);

						//add event listener - camera
						dialog.addEventListener('click', function(e) {
							Ti.API.info('You selected ' + e.index);
							if(e.index == 0) {
								//from the camera
								Titanium.Media.showCamera({
									success : function(event) {
										localImage = event.media;
										if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
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
										if(error.code == Titanium.Media.NO_CAMERA) {
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
						});

						//add event listener - choose from gallery
						dialog.addEventListener('click', function(e) {
							Ti.API.info('You selected ' + e.index);
							if(e.index == 1) {
								//obtain an image from the gallery
								Titanium.Media.openPhotoGallery({
									success : function(event) {
										localImage = event.media;
										// set image view
										Ti.API.debug('Our type was: ' + event.mediaType);
										if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
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
						});
					} else {
						alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				}