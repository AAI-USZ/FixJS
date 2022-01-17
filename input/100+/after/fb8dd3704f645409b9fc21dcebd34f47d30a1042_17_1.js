function(args) {
			var initialPosition,
				initialValue,
				self = this;
			
			self._track = dom.create("div", {
				className: "TiUISliderTrack"
			}, self.domNode);
			
			self._thumb = dom.create("div", {
				className: "TiUIElementGradient TiUISliderThumb"
			}, self.domNode);
			
			require.on(self, "touchstart", function(e) {
				initialPosition = e.x;
				initialValue = self.value;
			});
			require.on(self, "touchmove", function(e) {
				self.value = Math.round((e.x - initialPosition) * (self.max - self.min) / (self.domNode.clientWidth - 32) + initialValue);
			});
			
			require.on(self, "postlayout", function() {
				self._updateSize();
			});
			
		}