function(ship){
        var movement = null;    
        
        for (var i in ship.movement){
            if (ship.movement[i].commit == false)
                break;
                
            movement = ship.movement[i];
            
            if (movement.animated == true)
                continue;
            
            
                                
            if (movement.type=="move" || movement.type=="slipright" || movement.type=="slipleft"){
                var last = ship.movement[i-1];
                var lastpos = hexgrid.hexCoToPixel(last.x, last.y);
                lastpos.x = lastpos.x + (last.xOffset*gamedata.zoom);
                lastpos.y = lastpos.y + (last.yOffset*gamedata.zoom);
                var destination = hexgrid.hexCoToPixel(movement.x, movement.y);
                destination.x = destination.x + (movement.xOffset*gamedata.zoom);
                destination.y = destination.y + (movement.yOffset*gamedata.zoom);
                var perc = movement.animationtics / animation.movementspeed;
                
                return mathlib.getPointBetween(lastpos, destination, perc);
                
            }
            
            break;
            
        
        }
        
    
        var x = movement.x;
        var y = movement.y;
        
        var lastpos = hexgrid.hexCoToPixel(x, y);
        lastpos.x = lastpos.x + (movement.xOffset*gamedata.zoom);
        lastpos.y = lastpos.y + (movement.yOffset*gamedata.zoom);
        return lastpos;
    }