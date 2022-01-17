function(async) {
	if( async === $_ ) return;
	if(async == null) async = 0;
	this.wallColor = "#3d3c37";
	this.enableOutdoors = true;
	this.doorHeight = 13;
	this.async = async;
	this.roomInterv = -1;
	this.drawTile = new glidias.Rectangle(0,0,10,10);
	this.grid = new Array();
	this.doors = new Array();
	this.rooms = new Array();
	var _g = 0;
	while(_g < 80) {
		var i = _g++;
		this.grid[i] = new Array();
		var _g1 = 0;
		while(_g1 < 80) {
			var j = _g1++;
			this.grid[i][j] = 0;
		}
	}
	this.random = new glidias.PM_PRNG(12345);
}