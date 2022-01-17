function(args) {
			this._track = dom.create("div", {
				className: "TiUISliderTrack"
			}, this.domNode);
			
			this._thumb = dom.create("div", {
				className: "TiUIElementGradient TiUISliderThumb"
			}, this.domNode);
			
			var initialPosition,
				initialValue,
				self = this;
			this.addEventListener("touchstart", function(e) {
				initialPosition = e.x;
				initialValue = self.value;
			});
			this.addEventListener("touchmove", function(e) {
				self.value = Math.round((e.x - initialPosition) * (self.max - self.min) / (self.domNode.clientWidth - 32) + initialValue);
			});
		}