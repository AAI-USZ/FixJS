function(res) {
				console.log('channel change successfully requested.');

				// fix, wait until dvb hardware is ready for stream out
				setTimeout(function(){
				successCallback(channel);

				// send the channel change information to all registered handlers
				for (var i = 0; channelChangeHandlers.length > i; i++) {
					channelChangeHandlers[i](channel);
				}
				},3500);

			}