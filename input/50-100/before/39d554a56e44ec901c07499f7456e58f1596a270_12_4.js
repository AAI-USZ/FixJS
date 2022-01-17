function(ship, system){
        
        for (var i in ship.fireOrders){
            var fire = ship.fireOrders[i];
            if (fire.weaponid == system.id && fire.turn == gamedata.turn && !fire.rolled)
                return fire;
        }
        
        return false;
    
    }