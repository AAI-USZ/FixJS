function( alpha, beta ) {
	if (!( this instanceof arguments.callee )) return new jStat.kumaraswamy( alpha, beta );
	this.alpha = alpha;
	this.beta = beta;

	for ( var i in jStat.kumaraswamy.prototype ) this[i] = this[i].bind( this );
}