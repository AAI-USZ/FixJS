function() {
		this.$.client.show();
		if (this.hasNode()) {
			var v = this.orient == "v";
			var d = v ? "height" : "width";
			var p = v ? "top" : "left";
			this.applyStyle(d, null);
			var s = this.hasNode()[v ? "scrollHeight" : "scrollWidth"];
			this.$.animator.play({
				startValue: this.open ? 0 : s,
				endValue: this.open ? s : 0,
				dimension: d,
				position: p
			});
		} else {
			this.$.client.setShowing(this.open);
		}
	}