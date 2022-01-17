function findCharTile(xOffset, yOffset, findCollision, xANDy){
		var tile;
		var cx = character.x;
		var cy = character.y;
		var tilesX, tilesY;
		if(!!xANDy){
			cx = xANDy.x;
			cy = xANDy.y;
			tilesY = Math.round((cy - yOffset) / 32);
			tilesX = Math.round((cx - xOffset) / 32);
			tile = world[tilesY][tilesX];
		}else{
			tilesY = Math.round((cy - yOffset) / 32);
			tilesX = Math.round((cx - xOffset) / 32);
			tile = world[tilesY][tilesX];
		}
		if (findCollision) return tile.collision;
		return tile;
	}