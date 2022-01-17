function(ship)
    {
        var fires = new Array();
        for (var i in ship.systems)
        {
            if (ship.flight){
                var fighter = ship.systems[i];
                for (var a in fighter.systems){
                    var system = fighter.systems[a];
                    fires = fires.concat(system.fireOrders);
                }
                
            }else{
                var system = ship.systems[i];
                fires = fires.concat(system.fireOrders);
            }
            
        }
        return fires;
    }