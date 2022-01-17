function(e){
        shipSelectList.remove();
        
		var id = $(this).data("id");
        var ship = gamedata.getShip(id);
		
		var action = $(this).data("action");
        if (!action){
            shipManager.doShipClick(ship);
		}else if (action == "SOEW"){
            ew.AssignOEW(ship, "SOEW");
        }else if (action == "SDEW"){
            ew.AssignOEW(ship, "SDEW");
        }else if (action == "DIST"){
            ew.AssignOEW(ship, "DIST");
        }
	
	}