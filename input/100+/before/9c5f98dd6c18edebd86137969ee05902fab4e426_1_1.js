function(ship)
    {
        var fires = new Array();
        for (var i in ship.systems)
        {
            var system = ship.systems[i];
            fires = fires.concat(system.fireOrders);
        }
        return fires;
    }