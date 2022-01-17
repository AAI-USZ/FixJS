function( dof ) {
	if (!( this instanceof arguments.callee )) return new jStat.chisquare( dof );
	this.dof = dof;
}