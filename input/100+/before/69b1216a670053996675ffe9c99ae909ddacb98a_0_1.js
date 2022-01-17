function(e){
        console.log("mouseout");
		clearTimeout(shipClickable.shipClickableTimer);
        var ship = gamedata.getShip($(this).data("id"));
		shipClickable.ship = null;
		gamedata.mouseOverShipId = -1;
		if (shipClickable.shipNameElement != null){
			shipClickable.shipNameElement.hide();
		}
		
		if (shipClickable.weaponTargetingElement != null){
			shipClickable.weaponTargetingElement.hide();
		}
				
		if (gamedata.gamephase > 1){
			ew.RemoveEWEffects();
			EWindicators.drawEWindicators();
		}
        if (ship)
            shipManager.drawShip(ship);
	}