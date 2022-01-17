function() {
    var tree = {
        "osg.MatrixTransform": {
            "Name": "Lamp", 
            "Matrix": [ -0.2909, 0.9552, -0.0552, 0, -0.7711, -0.1999, 0.6045, 0, 0.5664, 0.2184, 0.7947, 0, 4.0762, 1.0055, 5.9039, 1 ], 
            "Children": [ {
                "osg.Node": {
                    "Name": "Lamp"
                }
            } ]
        }
    };

    osgDB.Promise.when((new osgDB.Input()).setJSON(tree).readObject()).then(function(result) {
        ok(result.getName() === "Lamp", "check matrix transform");
        ok(result.getMatrix()[0] === -0.2909, "check matrix transform content");
        start();
    });
}