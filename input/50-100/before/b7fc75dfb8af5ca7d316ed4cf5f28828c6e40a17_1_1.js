function(emitter, deltaTime){
	this._nToCreate	+= this._rate * deltaTime;
	// nParticles is the interger part of this._nToCreate as you spawn them one by one
	var nParticles	= Math.floor(this._nToCreate);
	// dont spawn more particles than available
	// TODO here estimate how much more is needed to never lack of it
	nParticles	= Math.min(nParticles, emitter.deadParticles().length);
	// update this._nToCreate
	this._nToCreate	-= nParticles;
	// spawn each particle
	for(var i = 0; i < nParticles; i++){
		emitter.spawnParticle();
	}
}