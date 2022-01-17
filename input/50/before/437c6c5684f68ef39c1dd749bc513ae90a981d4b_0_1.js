function(position) {
						timestamp = (new Date().getTime());
						location = position.coords;
						Log.debug('Location retrieved');
						if (typeof success == 'function') success(position.coords);
					}