function drawworldtop(){
    	for(var z = 0; z < top.length; z++){
    		var tile = world[top[z][0]][top[z][1]][top[z][2]];
    		ctx.drawImage(tile.g, tile.sx, tile.sy, tile.w, tile.h, tile.x + WIDTH/2 - characterInfo.x, tile.y + HEIGHT/2 - characterInfo.y, 32, 32);
    	}
    }