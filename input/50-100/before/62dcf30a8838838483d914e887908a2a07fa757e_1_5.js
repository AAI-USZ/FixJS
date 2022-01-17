function( shape, scale ) {
	if (!( this instanceof arguments.callee )) return new jStat.gamma( shape, scale );
	this.shape = shape;
	this.scale = scale;
}