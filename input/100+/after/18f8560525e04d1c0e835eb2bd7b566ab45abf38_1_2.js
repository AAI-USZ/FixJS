function drawworld(){
    	top = [];
        for(var i = 0; i < world.length; i++){
            for(var e = 0; e < world[i].length; e++){
                for (var t = 0; t < world[i][e].length; t++){
                    var tile = world[i][e][t];
                    if(tile.spec === 'Farming_Fishing AA' && tile.y > (character.position.y + 16)){
                    	top.push([i, e, t])
                    }else{
                        tile.draw(ctx);
                    }
                }
            }
        }
    }