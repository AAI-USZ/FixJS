function(error) {
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
							}