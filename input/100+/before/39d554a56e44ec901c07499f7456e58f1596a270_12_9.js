function(id){
        var fires = Array();
        
        for (var a in gamedata.ships){
            var ship = gamedata.ships[a];
            for (var i in ship.fireOrders){
                var fire = ship.fireOrders[i];
                if (fire.targetid == id && fire.turn == gamedata.turn && fire.type == "intercept")
                    fires.push(fire);
            }
        }
        
        return fires;
    
    }