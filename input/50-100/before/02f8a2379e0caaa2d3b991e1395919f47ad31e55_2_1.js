function(ship){
        var amount = 0;
        for (var i in gamedata.ships){
            var elint = gamedata.ships[i];
            if (elint == ship || !shipManager.isElint(elint))
                continue;
            
            var fdew = ew.getEWByType("SDEW", elint, ship)*0.5;

            if (fdew > amount)
               amount = fdew;
        }
        
        return amount;
    }