function(ship, type){
		if (gamedata.waiting == true || gamedata.gamephase != 1)
			return; 
        
        if (!type) 
            type = "OEW";
			
        var selected = gamedata.getSelectedShip();
        
		if (!selected)
			return;
			
        for (var i in selected.EW){
            var EWentry = selected.EW[i];
			
			if (EWentry.turn != gamedata.turn)
				continue;
				
            if (EWentry.type==type && EWentry.targetid == ship.id)
                return;
        }
        var left = ew.getDefensiveEW(selected);
        
        if (left < 1 || (type == "DIST" && left < 3)){
            return;
        }
            
		if (type == "OEW" && shipManager.criticals.hasCritical(shipManager.systems.getSystemByName(selected, "CnC"), "RestrictedEW")){
			var allOEW = ew.getAllOffensiveEW(selected);
			var all = ew.getScannerOutput(selected);
			
			if (allOEW+1 > all*0.5)
				return false;
		}
		var amount = 1;
        if (type == "DIST")
            amount = 3;
            
        selected.EW.push({shipid:selected.id, type:type, amount:amount, targetid:ship.id, turn:gamedata.turn});
        ew.adEWindicators(selected);
        gamedata.shipStatusChanged(selected);
    }