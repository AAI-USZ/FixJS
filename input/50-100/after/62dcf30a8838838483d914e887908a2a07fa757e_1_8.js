function( mean, std ) {
	if (!( this instanceof arguments.callee )) return new jStat.normal( mean, std );
	this.mean = mean;
	this.std = std;

	for ( var i in jStat.normal.prototype ) this[i] = this[i].bind( this );
}