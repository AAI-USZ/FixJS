function( alpha, beta ) {
	if (!( this instanceof arguments.callee )) return new jStat.beta( alpha, beta );
	this.alpha = alpha;
	this.beta = beta;
}