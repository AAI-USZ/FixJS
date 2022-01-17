function() {
            var polygon = new Cesium.Polygon(undefined);

            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-80.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 33.0),
                Cesium.Cartographic.fromDegrees(-80.0, 33.0)
            ]));

            polygon.material.color = {
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0
            };

            polygon.material = new Cesium.Material({
                'context': scene.getContext(),
                'template': {
                    'materials' : {
                        'grass' : {
                            'id' : 'GrassMaterial'
                        },
                        'asphalt' : {
                            'id' : 'AsphaltMaterial'
                        },
                        'cement' : {
                            'id' : 'CementMaterial'
                        }
                    },
                    'source' :
                        'agi_material agi_getMaterial(agi_materialInput materialInput)\n{\n' +
                        'agi_material material = agi_getDefaultMaterial(materialInput);\n' +
                        'float distanceFromCenter = abs(materialInput.st - vec2(0.5)).x;\n' +
                        'if(distanceFromCenter > 0.3){material.diffuse = grass.diffuse;}\n' +
                        'else if(distanceFromCenter > 0.2){material.diffuse = cement.diffuse;}\n' +
                        'else{material.diffuse = asphalt.diffuse;}\n' +
                        'return material;\n}\n'
                }
            });

            primitives.add(polygon);
        }