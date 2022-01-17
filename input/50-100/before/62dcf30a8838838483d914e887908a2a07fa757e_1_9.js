function( scale, shape ) {
	if (!( this instanceof arguments.callee )) return new jStat.pareto( scale, shape );
	this.scale = scale;
	this.shape = shape;
}