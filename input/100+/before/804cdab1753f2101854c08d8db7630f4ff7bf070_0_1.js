function player( pos, dir) {
	this.color = new color(0,1,0,1);
	this.position = pos;
	this.direction = dir;
	this.server_trace = [ new point(this.position.x, this.position.y)];
	this.temp_trace = [ new point(this.position.x, this.position.y) ];
	this.leftTurn = false;
	this.rightTurn = false;
	this.min_hue = 0;
	this.max_hue = 360;
}