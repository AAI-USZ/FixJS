function() {
		this.$.client.show();
		if (this.hasNode()) {
			if (this.$.animator.isAnimating()) {
				this.$.animator.reverse();
			} else {
				var v = this.orient == "v";
				var d = v ? "height" : "width";
				var p = v ? "top" : "left";
				// unfixing the height/width is needed to properly 
				// measure the scrollHeight/Width DOM property, but
				// can cause a momentary flash of content on some browsers
				this.applyStyle(d, null);
				var s = this.hasNode()[v ? "scrollHeight" : "scrollWidth"];
				this.$.animator.play({
					startValue: this.open ? 0 : s,
					endValue: this.open ? s : 0,
					dimension: d,
					position: p
				});
			}
		} else {
			this.$.client.setShowing(this.open);
		}
	}