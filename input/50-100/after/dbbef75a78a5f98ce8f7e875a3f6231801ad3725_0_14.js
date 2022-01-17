function(x,y,z,w) {
	if( x === $_ ) return;
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
}