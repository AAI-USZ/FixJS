function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-80.0, 30.0),
                new Cesium.Cartographic2(-70.0, 30.0),
                new Cesium.Cartographic2(-70.0, 40.0),
                new Cesium.Cartographic2(-80.0, 40.0)
            ]));

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'BrickMaterial',
                    'uniforms' : {
                        'u_brickColor' : {
                            'red': 0.6,
                            'green': 0.3,
                            'blue': 0.1,
                            'alpha': 1.0
                        },
                        'u_mortarColor' : {
                            'red' : 0.8,
                            'green' : 0.8,
                            'blue' : 0.7,
                            'alpha' : 1.0
                        },
                        'u_brickSize' : {
                            'x' : 0.30,
                            'y' : 0.15
                        },
                        'u_brickPct' : {
                            'x' : 0.90,
                            'y' : 0.85
                        },
                        'u_brickRoughness' : 0.2,
                        'u_mortarRoughness' : 0.1
                    },
                    'sourcePath' : 'BrickMaterial'
                }
            });

            primitives.add(polygon);
        }