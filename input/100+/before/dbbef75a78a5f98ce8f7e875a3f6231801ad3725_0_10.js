function(callbacker,gridSize) {
	if(gridSize == null) gridSize = 5;
	this.drawTile.width = gridSize;
	this.drawTile.height = gridSize;
	{
		var _g = 0;
		while(_g < 80) {
			var i = _g++;
			{
				var _g1 = 0;
				while(_g1 < 80) {
					var j = _g1++;
					this.drawTile.x = i * gridSize;
					this.drawTile.y = j * gridSize;
					switch(this.grid[i][j]) {
					case 0:{
						callbacker(this.drawTile.toHTML("background-color:#000000",null));
					}break;
					case 1:{
						callbacker(this.drawTile.toHTML("background-color:" + this.wallColor,null));
					}break;
					case 2:{
						callbacker(this.drawTile.toHTML("background-color:#FF0000",null));
					}break;
					case 3:{
						callbacker(this.drawTile.toHTML("background-color:#733F12",null));
					}break;
					default:{
						callbacker(this.drawTile.toHTML("background-color:#CCCCCC",null));
					}break;
					}
				}
			}
		}
	}
	var i = 0;
	while(i < 80) {
		this.drawTile.x = i * gridSize;
		this.drawTile.y = 0;
		callbacker(this.drawTile.toHTML("background-color:#FFFF00",null));
		i += 10;
	}
	i = 0;
	while(i < 80) {
		this.drawTile.x = 0;
		this.drawTile.y = i * gridSize;
		callbacker(this.drawTile.toHTML("background-color:#FFFF00",null));
		i += 10;
	}
}