function(){

								notifier.notify({
									message: 'We got loaders...',
									loader: true,
									modal: true,
									hideOnClick: true,
									ms: 3500
								}).on('destroy', function(){
										var msg3d = supports3d ? '<strong>You can now see our <em>3D module</em> in action.</strong>' : '';
										Backbone.Notifier.enableModule('3d');
										notifier.notify({
											title: 'Almost Done...',
											destroy: true,
											'3d': true,
											message: 'Backbone.Notifier can be can be easily extended thanks to smart modules architecture.<br />' + msg3d,
											buttons: [
												{text: 'Dismiss', 'class': 'default'}
											],
											type: 'success',
											position: 'center',
											modal: true,
											hideOnClick: true,
											ms: false
										})
											.on('destroy', function(){
												Backbone.Notifier.disableModule('3d');

												notifier.notify({
													message: "And there's so much more... <strong>Thanks for taking the tour.</strong><br /><em>Don't forget to tweet if you appreciate the work...!</em>",
													buttons: [
														{'data-role': 'dismiss', text: 'Dismiss', 'class': 'default'}
													],
													type: 'success',
													destroy: true,
													modal: true,
													hideOnClick: false,
													ms: 15000
												})
													.on('click:dismiss', 'destroy')
													.on('destroy', onTourEnd);

												setTimeout(function(){
													notifier.notify({
														modal: true,
														screenOpacity:.7,
														message: 'Features useful event mechanism with great API',
														type: 'error',
														hideOnClick: true,
														position: 'center',
														ms: 3500
													});
												}, 300);

											});


									});

							}