function() {
            var polygon = new Cesium.Polygon(undefined);

            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-100.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 33.0),
                Cesium.Cartographic.fromDegrees(-100.0, 33.0)
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
                        'diffuse' : {
                            'id' : 'DiffuseMapMaterial',
                            'uniforms' : {
                                'texture' : '../../Images/Cesium_Logo_Color.jpg'
                            }
                        }
                    },
                    'source' :
                        'agi_material agi_getMaterial(agi_materialInput materialInput)\n{\n' +
                        'agi_material material = agi_getDefaultMaterial(materialInput);\n' +
                        'vec2 value = 0.5 + 0.5*sin(materialInput.st);\n' +
                        'vec3 normalEC = material.normal;\n' +
                        'material.diffuse = mix(diffuse.diffuse, vec3(value.x + normalEC.x, value.y + normalEC.y, 0.0), normalEC.z);\n' +
                        'return material;\n}\n'
                }
            });

            primitives.add(polygon);
        }