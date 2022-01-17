function() {
	if(this.leftTurn) {
		this.direction -= time*Math.PI*dphi;
	}
	if(this.rightTurn) {
		this.direction += time*Math.PI*dphi;
	}
	this.position.x += time*Math.sin(this.direction)*dt;
	this.position.y += time*Math.cos(this.direction)*dt;
	this.temp_trace.push(new point(this.position.x, this.position.y));
}