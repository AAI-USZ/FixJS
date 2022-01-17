function(inSender) {
		if (this.hasNode()) {
			var d = inSender.dimension;
			this.node.style[d] = this.domStyles[d] = inSender.value + "px";
		}
		var cn = this.$.client.hasNode()
		if (cn) {
			var p = inSender.position;
			var o = (this.open ? inSender.endValue : inSender.startValue);
			cn.style[p] = this.$.client.domStyles[p] = (inSender.value - o) + "px";
		}
		if (this.container) {
			this.container.resized();
		}
	}