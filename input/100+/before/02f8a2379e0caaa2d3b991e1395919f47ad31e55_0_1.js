function(e){
		clearTimeout(shipClickable.shipClickableTimer); 
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
			
		}
		drawEntities();
	}