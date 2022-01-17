function( dof ) {
	if (!( this instanceof arguments.callee )) return new jStat.chisquare( dof );
	this.dof = dof;

	for ( var i in jStat.chisquare.prototype ) this[i] = this[i].bind( this );
}