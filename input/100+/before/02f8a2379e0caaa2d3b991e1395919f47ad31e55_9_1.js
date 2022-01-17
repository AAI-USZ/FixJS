function(target, base, shooter){

        var dew = ew.getDefensiveEW(target);
        if (shooter && shooter.flight)
			dew = 0;
		
		if (target.flight)
			dew = shipManager.movement.getJinking(target);
        
        var bdew = ew.getSupportedBDEW(target);
        if (target.flight)
            bdew = 0;
        
        var sdew = ew.getSupportedDEW(target);
        
        console.log("base: " + base + " dew: " + dew + " blanket: " + bdew + "supportDEW: " +  sdew);
        return base - dew - bdew - sdew;
        
        
    }