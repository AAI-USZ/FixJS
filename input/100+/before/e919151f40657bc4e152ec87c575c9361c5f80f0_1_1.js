function(shooter, target, weapon, calledid){
    
        var rangePenalty = weaponManager.calculateRangePenalty(shooter, target, weapon);
        var defence = weaponManager.getShipDefenceValue(shooter, target);
        //console.log("dis: " + dis + " disInHex: " + disInHex + " rangePenalty: " + rangePenalty);
        var baseDef = weaponManager.calculateBaseHitChange(target, defence, shooter);
        
        var soew = ew.getSupportedOEW(shooter, target);
        var dist = ew.getDistruptionEW(shooter);
        
        var oew = ew.getTargetingEW(shooter, target);
        oew -= dist;
		
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
        if (oew < 1){
            rangePenalty = rangePenalty*2;
         }else if (shooter.faction != target.faction){
            var jammer = shipManager.systems.getSystemByName(target, "jammer");
        
            if (jammer && !shipManager.power.isOffline(target, jammer))
                jammermod = rangePenalty*shipManager.systems.getOutput(shooter, jammer);

            if (target.flight){
                var jinking = shipManager.movement.getJinking(target);
                if ( jinking > jammermod){
                    jammermod = 0;
                }
                else{
                    jammermod = jammermod - jinking;
                }
            }
        }
            
        var firecontrol =  weaponManager.getFireControl(target, weapon);
            
        
        var goal = (baseDef - jammermod - rangePenalty + oew + soew + firecontrol + mod);
        
        var change = Math.round((goal/20)*100);
        console.log("rangePenalty: " + rangePenalty + " baseDef: " + baseDef + " oew: " + oew + " soew: "+soew+" firecontrol: " + firecontrol + " mod: " +mod+ " goal: " +goal);
        
        if (change > 100)
            change = 100;
        return change;
        
    
    }