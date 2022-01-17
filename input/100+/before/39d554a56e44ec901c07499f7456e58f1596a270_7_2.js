function(e){
		if (gamedata.waiting == true || gamedata.gamephase != 1)
			return; 
			
        var e = $(this).parent();
        var ship = e.data("ship");
        var entry = e.data("EW");
		var left = ew.getDefensiveEW(ship);
		if (left < 1)
            return;
		
        if (entry == "CCEW"){
            ship.EW.push({shipid:ship.id, type:"CCEW", amount:1, targetid:-1, turn:gamedata.turn});
        }else{
            
            if (shipManager.criticals.hasCritical(shipManager.systems.getSystemByName(ship, "CnC"), "RestrictedEW") && entry.type == "OEW"){
				var allOEW = ew.getAllOffensiveEW(ship);
				var all = ew.getScannerOutput(ship);
				
				if (allOEW+1 > all*0.5)
					return false;
			}
           
            
                
            entry.amount++;
        }
        gamedata.shipStatusChanged(ship);
        drawEntities();
    }