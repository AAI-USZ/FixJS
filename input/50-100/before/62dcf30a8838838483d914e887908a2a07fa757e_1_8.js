function( mean, std ) {
	if (!( this instanceof arguments.callee )) return new jStat.normal( mean, std );
	this.mean = mean;
	this.std = std;
}