function(nParticles){
	// call constructor of parent calss
	Fireworks.Spawner.call( this );
	// init class variables
	this._nParticles	= nParticles	|| 1;
	this._completed		= false;
	// start the spawner on init
	this.start();
}