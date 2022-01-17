function( rate ) {
	if (!( this instanceof arguments.callee )) return new jStat.exponential( rate );
	this.rate = rate;

	for ( var i in jStat.exponential.prototype ) this[i] = this[i].bind( this );
}