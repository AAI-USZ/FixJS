function(ball, calledid){
        if (!ball.targetid)
            return false;
        
        var shooter = gamedata.getShip(ball.shooterid);
        var weapon = shipManager.systems.getSystem(shooter, ball.weaponid);
        var target = gamedata.getShip(ball.targetid);
        
        var rangePenalty = weaponManager.calculateRangePenalty(shooter, target, weapon);
        
        var dew = ew.getDefensiveEW(target);
        if (target.flight)
			dew = shipManager.movement.getJinking(target);
        
        var bdew = ew.getSupportedBDEW(target);
        if (target.flight)
            bdew = 0;
        
        var sdew = ew.getSupportedDEW(target);
        var soew = ew.getSupportedOEW(shooter, target);
        var dist = ew.getDistruptionEW(shooter);
        
        var oew = ew.getTargetingEW(shooter, target);
        oew -= dist;
        
        var defence = weaponManager.getShipDefenceValuePos(ball.position, target);
        
        var firecontrol =  weaponManager.getFireControl(target, weapon);
        
        var intercept = weaponManager.getInterception(ball);
        
        var mod = 0;
        if (!shooter.flight)
			mod -= shipManager.criticals.hasCritical(shipManager.systems.getSystemByName(shooter, "CnC"), "PenaltyToHit");
       
		if (calledid)
			mod -= 8;
        
        var goal = (defence - dew - bdew - sdew - rangePenalty - intercept + oew + soew + firecontrol + mod);
        
        var change = Math.round((goal/20)*100);
        console.log("rangePenalty: " + rangePenalty + "intercept: " + intercept + " dew: " + dew + " oew: " + oew + " defence: " + defence + " firecontrol: " + firecontrol + " mod: " +mod+ " goal: " +goal);
        
        //if (change > 100)
        //  change = 100;
        return change;
        
    }