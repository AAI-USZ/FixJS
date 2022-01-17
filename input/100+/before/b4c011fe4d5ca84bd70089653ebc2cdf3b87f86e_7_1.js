function(ship){
        var shipsInHex = Array();
        for (var i in gamedata.ships){
            var ship2 = gamedata.ships[i];
            
            if (shipManager.isDestroyed(ship2))
				continue;
				
            //if (ship.id = ship2.d)
            //  continue;
                
            var pos1 = shipManager.getShipPosition(ship);
            var pos2 = shipManager.getShipPosition(ship2);
            
            
            if (pos1.x == pos2.x && pos1.y == pos2.y){
                shipsInHex.push(ship2);
            }
        }
        
        return shipsInHex;
    
    }