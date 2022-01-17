function(ship, location){
			
        return ship.structures[location];
        /*
        for (var i in ship.systems){
            if (ship.systems[i].location == location && ship.systems[i].name == "structure")
                return ship.systems[i];
        }
        
        return null;
        */
    }