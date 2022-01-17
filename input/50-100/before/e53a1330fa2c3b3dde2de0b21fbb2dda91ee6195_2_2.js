function(res) {
				console.log('channel change successfully requested.');

				successCallback(channel);

				// send the channel change information to all registered handlers
				for (var i = 0; channelChangeHandlers.length > i; i++) {
					channelChangeHandlers[i](channel);
				}

			}