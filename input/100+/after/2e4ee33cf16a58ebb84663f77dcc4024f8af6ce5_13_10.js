function() {
    var tree2 = { 
        "osg.Geometry": {
            "PrimitiveSetList": [ {
                "DrawArrays": {
                    "Count": 0, 
                    "First": 0, 
                    "Mode": "TRIANGLES"
                }
            } ], 
            "VertexAttributeList": {
            }
        }
    };

    osgDB.Promise.when((new osgDB.Input()).setJSON(tree2).readObject()).then(function(result) {
        return result.getPrimitiveSetList()[0];
    }).then(function(result) {
        ok(result.getMode() === osg.PrimitiveSet.TRIANGLES, "check DrawArray triangles");
        ok(result.getCount() === 0, "check triangles count");
        ok(result.getFirst() === 0, "check triangles first");
        start();
    });
}