function(inC, inIndex) {
		var w=this.colWidth, h=this.colHeight;
		var cols = Math.max(1, Math.floor(this.containerBounds.width / w));
		var c;
		for (var y=0, i=0; i<inC.length; y++) {
			for (var x=0; (x<cols) && (c=inC[i]); x++, i++) {
				this.arrangeControl(c, {left: w*x, top: h*y});
			}
		}
	}