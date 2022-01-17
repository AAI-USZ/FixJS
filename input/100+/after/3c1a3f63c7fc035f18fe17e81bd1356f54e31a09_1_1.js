function(inC, inIndex) {
		var o = Math.floor(this.container.getPanels().length/2);
		var c$ = this.getOrderedControls(Math.floor(inIndex)-o);
		var box = this.containerBounds[this.axisSize] - this.margin -this.margin;
		var e = this.margin - box * o;
		var m = (c$.length - 1) / 2;
		for (var i=0, c, b, v; (c=c$[i]); i++) {
			b = {};
			b[this.axisPosition] = e;
			b.opacity  = (i === 0 || i == c$.length-1) ? 0 : 1;
			this.arrangeControl(c, b);
			e += box;
		}
	}