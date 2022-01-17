function() {
			if (typeof self.attachBreathing == 'function') {
				clearInterval(timer);

				$(background).trigger("preload");
				self.attachBreathing($("#Breathing"));
			}
		}