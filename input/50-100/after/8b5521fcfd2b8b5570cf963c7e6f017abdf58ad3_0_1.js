function() {
					// if the window doesn't exist, exit
					if(window == null){
						return;
					}
					// remove the UI
					try {
						wv.removeEventListener('load', authorizeUICallback);
						window.close();
						loading = null;
						wv = null;
						window = null;
					} catch (ex) {
						Ti.API.debug('Cannot destroy the authorize UI. Ignoring.');
					}
				}