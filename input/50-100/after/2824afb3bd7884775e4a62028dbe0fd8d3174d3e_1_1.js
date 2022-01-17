function(opts){
	this._nParticles= opts.nParticles !== undefined ? opts.nParticles : 100;
	this._particles	= [];
	this._spawner	= null;
	this._effects	= [];
	this._started	= false;
	this._onUpdated	= null;
	this._intensity	= 0;

	this._effectsStackBuilder	= new Fireworks.EffectsStackBuilder(this)
}