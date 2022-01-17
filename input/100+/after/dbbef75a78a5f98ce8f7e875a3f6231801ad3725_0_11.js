function() {
	var fw = this.random.nextIntRange(6,12);
	var fh = this.random.nextIntRange(6,12);
	this.createRoom(Math.floor(80 * .5 - fw * .5),Math.floor(80 * .5 - fh * .5),fw,fh);
	this.currFeature = 50;
	if(this.async == 0) {
		while(this.createFeature()) {
		}
		if(this._onComplete) {
			this._onComplete();
			return;
		}
	} else this.roomInterv = 0;
}