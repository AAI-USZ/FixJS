function(ship){
        for (var i in ship.movement){
            var movement = ship.movement[i];
            if (movement.turn != gamedata.turn)
                continue;
            
            if (gamedata.gamephase == 3){
                if (movement.value == "combatpivot" && (movement.type == "pivotleft" || movement.type == "pivotright" )){
                   return true;
                }
                    
            }else{
                if (!movement.preturn && !movement.forced)
                    return true;
            }
        }
        
        return false;
    }