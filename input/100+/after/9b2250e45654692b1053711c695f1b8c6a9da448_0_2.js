function(ship, accel){
        
        if (gamedata.gamephase != 2)
            return false;
	
		if (shipManager.isDestroyed(ship) || shipManager.isAdrift(ship))
			return false;
        			
        if (shipManager.movement.checkHasUncommitted(ship))
            return false;
            
        
            
        if (shipManager.systems.isEngineDestroyed(ship))
			return false;
        
        for (var i in ship.movement){
            var movement = ship.movement[i];
            if (movement.turn != gamedata.turn)
                continue;
            
            if (movement.preturn == false && movement.forced == false && movement.type != "speedchange" && movement.type != "deploy")
                return false;
        
        }
        
        var curheading = shipManager.movement.getLastCommitedMove(ship).heading;
        
		for (var i in ship.movement){
			var movement = ship.movement[i];
			if (movement.turn != gamedata.turn || movement.type != "speedchange")
				continue;
	
			if ((movement.value != accel && movement.heading == curheading) || (movement.value == accel && movement.heading != curheading)){
				return true;
			}
		}
        
        if ( ship.accelcost <= shipManager.movement.getRemainingEngineThrust(ship)){
            return true;
            
        }
        
        return false;
        
    }