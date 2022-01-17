function(ship, system){
        
        var fires = weaponManager.getAllFireOrders(ship);
        for (var i in fires){
            var fire = fires[i];
            if (fire.weaponid == system.id && fire.turn == gamedata.turn && !fire.rolled)
                return fire;
        }
        
        return false;
    
    }