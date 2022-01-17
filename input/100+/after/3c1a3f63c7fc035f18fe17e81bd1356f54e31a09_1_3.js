function(inC, inName) {
		var s = this.inc;
		for (var i=0, l=inC.length, c; (c=inC[i]); i++) {
			var x = Math.cos(i/l * 2*Math.PI) * i * s + this.controlWidth;
			var y = Math.sin(i/l * 2*Math.PI) * i * s + this.controlHeight;
			this.arrangeControl(c, {left: x, top: y});
		}
	}