function deferredStop(dfdStop) {
					dfdStop.then(function doneStop() {
						self.signal("finalize", dfdFinalize);
					}, dfdFinalize.reject, dfdFinalize.notify);

					self.signal("stop", dfdStop);
				}