function(ship){
        var amount = 0;
        var elints = gamedata.getElintShips();
        for (var i in elints){
            var elint = elints[i];
            if (elint.id === ship.id)
                continue;
            
            var fdew = ew.getEWByType("SDEW", elint, ship)*0.5;

            if (fdew > amount)
               amount = fdew;
        }
        
        return amount;
    }