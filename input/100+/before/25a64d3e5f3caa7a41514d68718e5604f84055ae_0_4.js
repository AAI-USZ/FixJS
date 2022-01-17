function () {
			if (verbose) console.log('Feedback from ' + options.host + ':' + options.port);

			if (!cleartextStream.authorized) { throw cleartextStream.authorizationError; }

			cleartextStream.on('data', function (data) { feedBuffer(data); });

			cleartextStream.on('end', function () {
				if (freeIndex > 0) { // Flush
					if (verbose) console.log('Flushing');
					tuples(function(time, token) {
						self.emit('device', time, token.toString('hex'));
					});
					freeIndex = 0;
				}
				self.emit('end');
				clearConnection();
			})

			cleartextStream.on('error', function (err) {
				clearConnection();
				self.emit('error', err);
			});

			cleartextStream.on('close', function () {
				clearConnection();
				self.emit('close');
			});
		}