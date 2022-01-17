function( local, scale ) {
	if (!( this instanceof arguments.callee )) return new jStat.cauchy( local, scale );
	this.local = local;
	this.scale = scale;

	for ( var i in jStat.cauchy.prototype ) this[i] = this[i].bind( this );
}