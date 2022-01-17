function(shooter, target, weapon, calledid){
    
        var rangePenalty = weaponManager.calculateRangePenalty(shooter, target, weapon);
        
        //console.log("dis: " + dis + " disInHex: " + disInHex + " rangePenalty: " + rangePenalty);
        
        var dew = ew.getDefensiveEW(target);
        if (shooter.flight)
			dew = 0;
		
		if (target.flight)
			dew = shipManager.movement.getJinking(target);
		
		
        var oew = ew.getTargetingEW(shooter, target);
        
        if (shooter.flight)
			oew = shooter.offensivebonus;
        
        var mod = 0;
        
        if (weapon.piercing && weapon.firingMode == 2)
            mod -= 4;
        
        if (shipManager.movement.hasRolled(shooter)){
            console.log("rolled");
            mod -= 3;
        }
        
        if (shipManager.movement.hasPivotedForShooting(shooter)){
            console.log("pivoting");
            mod -= 3;
        }
        if (!shooter.flight)
			mod -= shipManager.criticals.hasCritical(shipManager.systems.getSystemByName(shooter, "CnC"), "PenaltyToHit");
        
        if (calledid)
			mod -= 8;
        
        var jammermod = 0;
        if (oew == 0){
            rangePenalty = rangePenalty*2;
         }else{
            var jammer = shipManager.systems.getSystemByName(target, "jammer");
        
            if (jammer)
                jammermod = rangePenalty*(shipManager.systems.getOutput(shooter, jammer)-1);

            if (target.hasClass("fightersystem")){
                if (dew > jammermod){
                    jammermod = 0;
                }
                else{
                    dew = 0;
                }
            }
        }
            
        var defence = weaponManager.getShipDefenceValue(shooter, target);
        
        var firecontrol =  weaponManager.getFireControl(target, weapon);
            
        
        var goal = (defence - dew - jammermod - rangePenalty + oew + firecontrol + mod);
        
        var change = Math.round((goal/20)*100);
        console.log("rangePenalty: " + rangePenalty + " dew: " + dew + " oew: " + oew + " defence: " + defence + " firecontrol: " + firecontrol + " mod: " +mod+ " goal: " +goal);
        
        if (change > 100)
            change = 100;
        return change;
        
    
    }