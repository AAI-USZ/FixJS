function(){
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

											}