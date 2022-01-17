function() {
										var state = (sr.code >= 1) ? 'alert' : 'error';
										$option.trigger( 'iceEasyOptionsPost', [ state, opt_name, opt_reset ] );
										$(this).iceEasyFlash(state, sr.message).fadeIn();
									}