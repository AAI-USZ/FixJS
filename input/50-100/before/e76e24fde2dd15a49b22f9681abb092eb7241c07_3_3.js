function(err) {
				if (err.code === 'ECONNREFUSED' && tries > 0) {
					console.log('got error, requesting channel change again.');
					tries -= 1;
					setTimeout(function() {
						requestChannel(playlistId);
					}, 1400);
					return;
				}
				if (typeof errorCallback === 'function') {
					errorCallback(err);
				}
				console.log('got error, channel change failed.');
			}