function findCollision(xOffset, yOffset){
		var tilesX = Math.round((character.position.x + xOffset) / 32);
	    var tilesY = Math.round((character.position.y + yOffset) / 32);
	    try{
		    var location = world[tilesY][tilesX];
		    if (location.collision) location[0].debug();
            // if(frame%30 === 0){
            //              console.log(location);
            // }
		    return location.collision;
		}catch(e){
		    return true;
	    }
    }