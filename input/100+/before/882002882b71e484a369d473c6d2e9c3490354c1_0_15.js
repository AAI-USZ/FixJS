function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-80.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 40.0),
                Cesium.Cartographic.fromDegrees(-80.0, 40.0)
            ]));

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'BrickMaterial',
                    'uniforms' : {
                        'brickColor' : {
                            'red': 0.6,
                            'green': 0.3,
                            'blue': 0.1,
                            'alpha': 1.0
                        },
                        'mortarColor' : {
                            'red' : 0.8,
                            'green' : 0.8,
                            'blue' : 0.7,
                            'alpha' : 1.0
                        },
                        'brickSize' : {
                            'x' : 0.30,
                            'y' : 0.15
                        },
                        'brickPct' : {
                            'x' : 0.90,
                            'y' : 0.85
                        },
                        'brickRoughness' : 0.2,
                        'mortarRoughness' : 0.1
                    },
                    'sourcePath' : 'BrickMaterial'
                }
            });

            primitives.add(polygon);
        }