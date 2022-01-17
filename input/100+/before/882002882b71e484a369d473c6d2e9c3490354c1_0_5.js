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
                    'uniforms' : {
                        'texture' : '../../Images/Cesium_Logo_Color.jpg'
                    },
                    'source' :
                        'agi_material agi_getMaterial(agi_materialInput materialInput)\n{\n' +
                        'agi_material material = agi_getDefaultMaterial(materialInput);\n' +
                        'vec2 distanceFromCenter = abs(materialInput.st - vec2(0.5));\n' +
                        'vec4 textureValue = texture2D(texture, pow(distanceFromCenter, vec2(0.5)));\n' +
                        'material.diffuse = textureValue.rgb;\n' +
                        'return material;\n}\n',
                    'components' : {
                    }
                }
            });

            primitives.add(polygon);
        }