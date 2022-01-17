function () {
			if (verbose) log('Feedback from ' + options.host + ':' + options.port);

			if (!cleartextStream.authorized) { throw cleartextStream.authorizationError; }

			cleartextStream.on('data', function (data) { feedBuffer(data); });

			cleartextStream.on('end', function () {
				if (freeIndex > 0) { // Flush
					if (verbose) log('Flushing');
					tuples(function(time, token) {
						self.emit('device', time, token.toString('hex'));
					});
					freeIndex = 0;
				}
				self.emit('end');
				clearConnection();
			});

			cleartextStream.on('close', function () {
				clearConnection();
				self.emit('close');
			});
		}