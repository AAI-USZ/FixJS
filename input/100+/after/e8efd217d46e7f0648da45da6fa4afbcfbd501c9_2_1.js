function findLocationAt(x,y){
		if (x === undefined){
		    x = character.x;
		    y = character.y;
		}
		var chunk = WorldChunk.chunkAt(x,y);
		if (chunk){
		    return chunk.locationAt(x,y);
		}
	}