function( rate ) {
	if (!( this instanceof arguments.callee )) return new jStat.exponential( rate );
	this.rate = rate;
}