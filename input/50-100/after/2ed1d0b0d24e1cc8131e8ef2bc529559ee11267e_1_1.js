function(animal)
    {
        var environment = 
        {   
            'manager'        : that,
            'canvas'         : that.canvas, 
            'force'          : that.force, 
            'catContainer'   : that.catContainer,
            'markerContainer': that.markerContainer
        };

        for (var envName in environment)
        {
            animal[envName] = environment[envName];
        };
    }