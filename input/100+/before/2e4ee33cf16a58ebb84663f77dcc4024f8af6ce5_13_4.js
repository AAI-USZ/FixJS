function() {
        var tree = {
                  "osg.Geometry": {
                    "Name": "Cube", 
                    "StateSet": {
                      "osg.StateSet": {
                        "Name": "Material", 
                        "AttributeList": [ {
                          "osg.Material": {
                            "Name": "Material", 
                            "Ambient": [ 0.8, 0.8, 0.8, 1], 
                            "Diffuse": [ 0.64, 0.64, 0.64, 1], 
                            "Emission": [ 0, 0, 0, 1], 
                            "Shininess": 12.5, 
                            "Specular": [ 0.5, 0.5, 0.5, 1]
                          }
                        } ],
                        "UserDataContainer": {
                          "UniqueID": 23, 
                            "Values": [ 
                                {
                                    "Name": "source", 
                                    "Value": "blender"
                                },
                                {
                                    "Name": "DiffuseIntensity", 
                                    "Value": "1.0"
                                },
                                {
                                    "Name": "DiffuseColor", 
                                    "Value": "[ 0, 0, 0 ]"
                                },
                                {
                                    "Name": "SpecularIntensity", 
                                    "Value": "0.0"
                                },
                                {
                                    "Name": "SpecularColor", 
                                    "Value": "[ 1, 1, 1 ]"
                                },
                                {
                                    "Name": "SpecularHardness", 
                                    "Value": "50"
                                },
                                {
                                    "Name": "Emit", 
                                    "Value": "0.0"
                                },
                                {
                                    "Name": "Ambient", 
                                    "Value": "1.0"
                                },
                                {
                                    "Name": "Translucency", 
                                    "Value": "0.0"
                                } ]
                        }
                      }
                    }, 
                    "VertexAttributeList": {
                      "Normal": {
                        "Elements": [ 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 1, -0, 0, 1, -0, 0, 1, -0, 0, 1, -0, 0, -0, -1, -0, -0, -1, -0, -0, -1, -0, -0, -1, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0 ], 
                        "ItemSize": 3, 
                        "Type": "ARRAY_BUFFER"
                      }, 
                      "Vertex": {
                        "Elements": [ 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1 ], 
                        "ItemSize": 3, 
                        "Type": "ARRAY_BUFFER"
                      }
                    }, 
                    "PrimitiveSetList": [ {
                      "DrawElementUShort": {
                        "Indices": {
                          "Elements": [ 0, 1, 3, 1, 2, 3, 4, 5, 7, 5, 6, 7, 8, 9, 11, 9, 10, 11, 12, 13, 15, 13, 14, 15, 16, 17, 19, 17, 18, 19, 20, 21, 23, 21, 22, 23 ], 
                          "ItemSize": 1, 
                          "Type": "ELEMENT_ARRAY_BUFFER"
                        }, 
                        "Mode": "TRIANGLES"
                      }
                    } ]
                  }
                };

        var result = (new osgDB.Input()).setJSON(tree).readObject();
        ok(result.getStateSet() !== undefined, "check geometry StateSet");
        ok(result.getStateSet().getUserData() !== undefined, "check StateSet userdata");
        ok(result.getPrimitiveSetList().length == 1, "check primitives");
        ok(result.getPrimitiveSetList()[0].getMode() === osg.PrimitiveSet.TRIANGLES, "check triangles primitive");
        ok(result.getPrimitiveSetList()[0].getFirst() === 0, "check triangles first index");
        ok(result.getPrimitiveSetList()[0].getIndices().getElements().length === 36, "check triangles indices");
        ok(result.getPrimitiveSetList()[0].getIndices().getElements().length === result.getPrimitiveSetList()[0].getCount(), "check triangles count");
        ok(Object.keys(result.getVertexAttributeList()).length === 2, "check vertex attributes");

    }