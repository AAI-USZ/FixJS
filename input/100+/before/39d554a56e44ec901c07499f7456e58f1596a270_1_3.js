function(e){
	
		var id = $(this).data("id");
        var ship = gamedata.getShip(id);
		
		
		shipManager.doShipClick(ship);
		
	
	}