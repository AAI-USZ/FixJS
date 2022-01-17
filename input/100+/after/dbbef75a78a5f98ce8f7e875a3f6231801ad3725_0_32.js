function(inX,inY) {
	if( inX === $_ ) return;
	this.x = inX == null?0.0:inX;
	this.y = inY == null?0.0:inY;
}