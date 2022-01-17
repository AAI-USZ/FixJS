function(id){
        var intercepts = Array();
        
        for (var a in gamedata.ships){
            var ship = gamedata.ships[a];
            var fires = weaponManager.getAllFireOrders(ship);
            for (var i in fires){
                var fire = fires[i];
                if (fire.targetid == id && fire.turn == gamedata.turn && fire.type == "intercept")
                    intercepts.push(fire);
            }
        }
        
        return intercepts;
    
    }