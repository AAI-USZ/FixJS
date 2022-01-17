function( scale, shape ) {
	if (!( this instanceof arguments.callee )) return new jStat.weibull( scale, shape );
	this.scale = scale;
	this.shape = shape;
}