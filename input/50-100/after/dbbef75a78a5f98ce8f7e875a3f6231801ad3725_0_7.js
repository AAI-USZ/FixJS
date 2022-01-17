function(x,y,z,w) {
	if( x === $_ ) return;
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}