function(type) {
	pos = this.p1.getPosition();
	this.tempParticle = new nucleotron.Particle(type);
	this.tempParticle.enableSimulation(pos.x, pos.y - 60);
	this.world.appendChild(this.tempParticle);
	
	this.particles.push(this.tempParticle);

	console.log("particles: " + this.particles.length);
}