function(ship, system){
        
        return system.destroyed;
        

        /*
        var d = damageManager.getDamage(ship, system);
        var stru = shipManager.systems.getStructureSystem(ship, system.location);
        if (stru && stru != system && shipManager.systems.isDestroyed(ship, stru))
            return true;
            
        if (system.fighter && shipManager.criticals.hasCritical(system, "DisengagedFighter"))
			return true;
            
            
        return (d >= system.maxhealth);
        */
    }