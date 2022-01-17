function() {
            var polygon = new Cesium.Polygon();
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-90.0, 27.0),
                Cesium.Cartographic.fromDegrees(-70.0, 27.0),
                Cesium.Cartographic.fromDegrees(-70.0, 36.0),
                Cesium.Cartographic.fromDegrees(-90.0, 36.0)
            ]));

            polygon.material.color = {
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0
            };

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'materials' : {
                        'bumpMap' : {
                            'id' : 'BumpMapMaterial',
                            'uniforms' : {
                                'texture' : '../../Images/earthbump1k.jpg',
                                'bumpMapChannel' : 'r',
                                'repeat' : {
                                    'x' : 1,
                                    'y' : 1
                                }
                            }
                        }
                    },
                    'components' : {
                        'diffuse' : 'vec3(0.3, 0.3, 0.3)',
                        'specular' : 0.01,
                        'normal' : 'bumpMap.normal'
                    }
                }
            });

            primitives.add(polygon);
        }