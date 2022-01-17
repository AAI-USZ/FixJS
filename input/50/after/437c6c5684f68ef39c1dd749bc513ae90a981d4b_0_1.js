function(position) {
						timestamp = (new Date().getTime());
						location = position.coords;
						if (typeof success == 'function') success(position.coords);
					}