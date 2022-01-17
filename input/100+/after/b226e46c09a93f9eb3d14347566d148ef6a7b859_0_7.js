function(){
				this.destroy();
				showThemeChooser({position: 'bottom'});

				notifier.notify({
					message: "Backbone.Notifier support different styles and positions,<br />which are fully customizable. <strong>Wanna see more?</strong>",
					type: 'warning',
					position: 'center',
					modal: true,
					ms: false,
					section: 'tour',
					buttons: [
						{'data-role': 'ok', text: 'Sure!', 'class': 'default'},
						{'data-role': 'cancel', 'class': 'link', text: 'No, I think I\'ve got it'}
					]
				})
					.on('click:ok', function(){
						this.destroy();

						notifier.notify({
							type: 'info',
							title: "Information",
							message: "This is a 'dialog' <em>info</em> notification. Dialog-styled notifications are also available in the same all types, and creating new types doens't require extra css for dialogs.",
							section: 'tour',
							buttons: [
								{'data-role': 'ok', text: 'Continue the tour', 'class': 'default'},
								{'data-role': 'cancel', 'class': 'link', text: 'Skip tour'}
							],
							modal: true,
							ms: null
						})
							.on('click:ok', function(){

								notifier.notify({
									message: 'We got loaders...',
									loader: true,
									modal: true,
									section: 'tour',
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
											section: 'tour',
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
													section: 'tour',
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
														section: 'tour',
														hideOnClick: true,
														position: 'center',
														ms: 3500
													});
												}, 300);

											});


									});

							})
							.on('click:cancel', quitTour);

					})
					.on('click:cancel', quitTour);

			}