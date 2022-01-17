function(ship, event){
	
		var list = shipManager.getShipsInSameHex(ship);
		
		if (list.length > 1)
			return true;
        
        if (event && event.which === 1 && gamedata.gamephase == 1){
            var selectedShip = gamedata.getSelectedShip();
            if (shipManager.isElint(selectedShip)){
                if (selectedShip != ship && ew.checkInELINTDistance(selectedShip, ship)){
                    return true;
                }
                if (!gamedata.isMyShip(ship) && ew.checkInELINTDistance(selectedShip, ship, 30)){
                    return true;
                }
            }
        }
		return false;
		
	
	}