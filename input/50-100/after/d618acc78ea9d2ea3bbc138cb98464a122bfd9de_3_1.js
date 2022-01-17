function(x, y, notify) {
		if (!this.isVisible) return;
		if (notify == undefined) notify = false;

		this.destinationX	= x;
		this.destinationY	= y;
		this.isMoving		= true;

		this.sendData('character_moved', {x: this.destinationX, y: this.destinationY}, notify);	
	}