function() {
        var tree = { 
            "osg.Geometry": {
                "PrimitiveSetList": [ {
                    "DrawArray": {
                        "count": 3540, 
                        "first": 10, 
                        "mode": "TRIANGLES"
                    }
                } ], 
                "VertexAttributeList": {
                }
            }
        };
        var result = (new osgDB.Input()).setJSON(tree).readObject().getPrimitiveSetList()[0];
        
        ok(result.getMode() === osg.PrimitiveSet.TRIANGLES, "check DrawArray triangles");
        ok(result.getCount() === 3540, "check triangles count");
        ok(result.getFirst() === 10, "check triangles first");


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
        result = (new osgDB.Input()).setJSON(tree2).readObject().getPrimitiveSetList()[0];
        
        ok(result.getMode() === osg.PrimitiveSet.TRIANGLES, "check DrawArray triangles");
        ok(result.getCount() === 0, "check triangles count");
        ok(result.getFirst() === 0, "check triangles first");


    }