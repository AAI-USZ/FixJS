function( shape, scale ) {
	if (!( this instanceof arguments.callee )) return new jStat.gamma( shape, scale );
	this.shape = shape;
	this.scale = scale;

	for ( var i in jStat.gamma.prototype ) this[i] = this[i].bind( this );
}