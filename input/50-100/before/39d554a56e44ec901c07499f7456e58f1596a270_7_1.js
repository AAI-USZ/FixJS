function(ship){
        
        for (var i in ship.EW){
            var EWentry = ship.EW[i];
			if (EWentry.turn != gamedata.turn)
				continue;
				
            if (EWentry.type == "CCEW"){
                return EWentry.amount;
            }        
        }
        
        return 0;
        
    }