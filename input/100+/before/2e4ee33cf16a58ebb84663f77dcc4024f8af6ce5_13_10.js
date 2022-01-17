function() {
        var tree = { 
            "osg.Geometry": {
                "PrimitiveSetList": [ {
                    "DrawArrayLengths": {
                        "First": 10, 
                        "Mode": "TRIANGLES",
                        "ArrayLengths": [ 3, 3, 3 ]
                    }
                } ], 
                "VertexAttributeList": {
                }
            }
        };
        var result = (new osgDB.Input()).setJSON(tree).readObject().getPrimitiveSetList()[0];
        
        ok(result.getMode() === osg.PrimitiveSet.TRIANGLES, "check DrawArrayLengths triangles");
        ok(result.getArrayLengths()[0] === 3 , "check array lenght");
        ok(result.getFirst() === 10, "check triangles first");

    }