function deferredStop(dfdStop) {
					dfdStop.then(function doneStop() {
						self.signal("finalize", dfdStop);
					}, dfdFinalize.reject, dfdFinalize.notify);

					self.signal("stop", dfdFinalize);
				}