function( dof ) {
	if (!( this instanceof arguments.callee )) return new jStat.studentt( dof );
	this.dof = dof;
}