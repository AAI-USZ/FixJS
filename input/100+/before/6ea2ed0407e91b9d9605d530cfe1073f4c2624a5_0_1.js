function player() {
	this.color = new color(0,1,0,1);
	this.position = new point(Math.random()*2-1, Math.random()*2-1);
	this.direction = Math.random()*Math.PI*2;
	this.server_trace = [ new point(this.position.x, this.position.y)];
	this.temp_trace = [ new point(this.position.x, this.position.y) ];
	this.leftTurn = false;
	this.rightTurn = false;
	this.min_hue = 0;
	this.max_hue = 360;
}