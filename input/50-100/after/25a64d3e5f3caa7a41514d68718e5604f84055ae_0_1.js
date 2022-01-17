function () {
				if (freeIndex > 0) { // Flush
					if (verbose) log('Flushing');
					tuples(function(time, token) {
						self.emit('device', time, token.toString('hex'));
					});
					freeIndex = 0;
				}
				self.emit('end');
				clearConnection();
			}