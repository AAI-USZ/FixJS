function( a, b ) {
	if (!( this instanceof arguments.callee )) return new jStat.uniform( a, b );
	this.a = a;
	this.b = b;
}