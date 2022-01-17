function(rate){
	// call constructor of parent calss
	Fireworks.Spawner.call( this );
	// init class variables
	this._rate	= rate	|| 10;
	this._nToCreate	= 1;
	// start the spawner on init
	this.start();
}