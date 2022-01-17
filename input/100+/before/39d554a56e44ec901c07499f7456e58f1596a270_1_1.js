function(ship){
	
		var list = shipManager.getShipsInSameHex(ship);
		
		if (list.length > 1)
			return true;
			
		return false;
		
	
	}