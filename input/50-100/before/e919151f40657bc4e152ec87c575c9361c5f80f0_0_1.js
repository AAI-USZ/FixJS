function(ship, name){
        for (var i in ship.systems){
            var system = ship.systems[i];
            if (system.name == name){
                return system;
            }
            
        
        }
        
        return null;
    
    }