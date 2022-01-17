function(ship){
        
        for (var i in ship.fireOrders){
            var fire = ship.fireOrders[i];
            var weapon = shipManager.systems.getSystem(ship, fire.weaponid)
            if (fire.turn == gamedata.turn && !fire.rolled && !weapon.ballistic){
                return false;
            }
                
        }
        return true;
    
    }