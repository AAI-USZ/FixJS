f        //console.log(ship.name + " checking turn");
        
        if (gamedata.gamephase != 2)
            return false;
        
		if (shipManager.isDestroyed(ship) || shipManager.isAdrift(ship))
			return false;
		
		if (shipManager.systems.isEngineDestroyed(ship))
			return false;
			
			
        var heading = shipManager.movement.getLastCommitedMove(ship).heading;
        var facing = shipManager.movement.getLastCommitedMove(ship).facing;
        
        if (shipManager.movement.isRolling(ship) && !ship.gravitic)
            return false;
        
        if (shipManager.movement.checkHasUncommitted(ship))
            return false;
            
        var turndelay = shipManager.movement.calculateCurrentTurndelay(ship);
        
        var previous = shipManager.movement.getLastCommitedMove(ship);
               
       
        if (!(ship.agile && previous && shipManager.movement.isTurn(previous)) && turndelay > 0){
            //console.log(ship.name + " has turn delay, cant turn");
            return false;
        }
        
        var speed = shipManager.movement.getSpeed(ship);        
        var turncost = Math.round(speed * ship.turncost);
        
        //console.log("remaining thrust: " + shipManager.movement.getRemainingEngineThrust(ship) + " turncost: "  + turncost);
        if (shipManager.movement.getRemainingEngineThrust(ship) < turncost){
            //console.log(ship.name + " does not have enough thrust");
            return false;
        }
        
        
        var pivoting = shipManager.movement.isPivoting(ship);
        if (pivoting != "no" && !ship.gravitic ){ //&& !shipManager.movement.isTurningToPivot(ship, right) && !ship.gravitic){
            //console.log(ship.name + " pivoting and not gravitic");
            return false;
        }
        if (heading !== facing && !shipManager.movement.canTurnToPivot(ship, right) 
            && !ship.gravitic && speed != 0)
        {
            //console.log(ship.name + " heading is not facing, and cant turn to pivot");
            return false;
        }
            
        
        //console.log(ship.name + " can turn");
        return true;
        
        
        
    },
