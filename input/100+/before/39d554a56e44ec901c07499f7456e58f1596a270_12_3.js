function(ball){
        
        var intercept = 0;
        
        for (var i in gamedata.ships){
            for (var a in gamedata.ships[i].fireOrders){
                var fire = gamedata.ships[i].fireOrders[a];
                if (fire.type == "intercept" && fire.targetid == ball.fireOrderId){
                    var ship = gamedata.getShip(fire.shooterid);
                    var weapon = shipManager.systems.getSystem(ship, fire.weaponid);
                    intercept += weapon.intercept;
                }
            }
            
            
        }
        
        return intercept;
        
    }