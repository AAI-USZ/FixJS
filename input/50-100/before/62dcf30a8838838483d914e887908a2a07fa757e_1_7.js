function( mu, sigma ) {
	if (!( this instanceof arguments.callee )) return new jStat.lognormal( mu, sigma );
	this.mu = mu;
	this.sigma = sigma;
}