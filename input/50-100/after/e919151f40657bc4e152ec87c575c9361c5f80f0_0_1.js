function(ship, name){
        for (var i in ship.systems){
            var system = ship.systems[i];
            if (system.fighter){
                for (var a in system.systems){
                    var figsys = system.systems[a];
                    
                    if (figsys.name == name){
                        return figsys;
                    }
                }
            }
            if (system.name == name){
                return system;
            }
            
        
        }
        
        return null;
    
    }