function(pos) {
		this.initStart = this.startx;
		this.initEnd = this.endx;

		// Check to see if the handle was clicked
		this.resizeSide = this.onHandle(pos);
		this.active = true;
	}