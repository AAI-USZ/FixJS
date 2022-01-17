function(type, n, z, e, pX, pY) {
	if(pX == null || pY == null){
		pos = this.p1.getPosition();	
	}
	else{
		pos = new goog.math.Vec2(pX, pY);
	}
	this.tempParticle = new nucleotron.Particle(type, n, z, e);
	this.tempParticle.enableSimulation(pos.x, pos.y - 60);
	this.world.appendChild(this.tempParticle);
	
	this.particles.push(this.tempParticle);

	console.log("particles: " + this.particles.length);
}