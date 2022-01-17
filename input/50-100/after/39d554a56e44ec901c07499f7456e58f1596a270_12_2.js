function(ship, system){
        
        for (var i in system.fireOrders){
            var fire = system.fireOrders[i];
            if (fire.weaponid == system.id && fire.turn == gamedata.turn && !fire.rolled){
                if ((gamedata.gamephase == 1 && system.ballistic) || (gamedata.gamephase == 3 && !system.ballistic)){
                    return true;
                }
            }
                
        }
        return false;
    
    }