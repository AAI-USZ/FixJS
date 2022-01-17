function( dof ) {
	if (!( this instanceof arguments.callee )) return new jStat.studentt( dof );
	this.dof = dof;

	for ( var i in jStat.studentt.prototype ) this[i] = this[i].bind( this );
}