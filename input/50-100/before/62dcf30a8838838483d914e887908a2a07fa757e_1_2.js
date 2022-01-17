function( local, scale ) {
	if (!( this instanceof arguments.callee )) return new jStat.cauchy( local, scale );
	this.local = local;
	this.scale = scale;
}