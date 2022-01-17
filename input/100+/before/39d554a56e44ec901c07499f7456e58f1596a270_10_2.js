function(ship, right){
        var requiredThrust = Array(null,null,null,null,null);
        
        var speed = shipManager.movement.getSpeed(ship);        
        var turncost = Math.round(speed * ship.turncost);
        
        var side, sideindex, rear, rearindex, any;
        
        if (ship.flight){
			if (turncost == 0)
				turncost = 1;
				
			requiredThrust[0] = turncost;
			return requiredThrust;
		}
        
        side = Math.floor(turncost / 2);
        rear = Math.floor(turncost / 2);
        any = turncost % 2;
        
        var back = shipManager.movement.isGoingBackwards(ship);

        var reversed = ((back || shipManager.movement.isRolled(ship)) && !(back && shipManager.movement.isRolled(ship)));
        if (reversed)
            right = !right;
        
        if ( right){
            sideindex = 3;
        }else{
            sideindex = 4;
        }
        
        if ( back ){
            rearindex = 1;
        }else{
            rearindex = 2;
        }
        
        requiredThrust[0] = any;
        requiredThrust[sideindex] = side;
        requiredThrust[rearindex] = rear;
        
		var empty = true;
		for (var i in requiredThrust){
			if (requiredThrust[i] > 0){
				empty = false;
				break;
			}
				
		}
		
		if (empty){
			requiredThrust[0] = 1;
		}
		
        return requiredThrust;
    }