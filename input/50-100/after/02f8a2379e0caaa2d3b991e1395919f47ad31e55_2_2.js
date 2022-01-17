function(ship){
        var amount = 0;
        var elints = gamedata.getElintShips();
        for (var i in elints){
            var elint = elints[i];
            if ( !ew.checkInELINTDistance(ship, elint, 20))
                continue;
            
            var fdew = ew.getEWByType("BDEW", elint)*0.25;

            if (fdew > amount)
               amount = fdew;
        }
        return amount;
    }