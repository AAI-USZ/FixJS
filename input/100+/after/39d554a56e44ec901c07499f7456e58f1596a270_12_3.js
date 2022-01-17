function(ball){
        
        var intercept = 0;
        
        for (var i in gamedata.ships){
            var ship = gamedata.ships[i];
            var fires = weaponManager.getAllFireOrders(ship);
            for (var a in fires){
                var fire = fires[a];
                if (fire.type == "intercept" && fire.targetid == ball.fireOrderId){
                    var weapon = shipManager.systems.getSystem(ship, fire.weaponid);
                    intercept += weapon.intercept;
                }
            }
            
            
        }
        
        return intercept;
        
    }