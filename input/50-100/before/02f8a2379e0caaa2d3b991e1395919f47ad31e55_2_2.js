function(ship){
        var amount = 0;
        for (var i in gamedata.ships){
            var elint = gamedata.ships[i];
            if ( !shipManager.isElint(elint) || !ew.checkInELINTDistance(ship, elint, 20))
                continue;
            
            var fdew = ew.getEWByType("BDEW", elint)*0.25;

            if (fdew > amount)
               amount = fdew;
        }
        return amount;
    }