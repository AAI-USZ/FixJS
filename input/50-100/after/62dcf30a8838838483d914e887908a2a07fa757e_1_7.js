function( mu, sigma ) {
	if (!( this instanceof arguments.callee )) return new jStat.lognormal( mu, sigma );
	this.mu = mu;
	this.sigma = sigma;

	for ( var i in jStat.lognormal.prototype ) this[i] = this[i].bind( this );
}