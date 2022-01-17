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
                    'id' : 'WoodMaterial',
                    'uniforms' : {
                        'u_lightWoodColor' : {
                            'red' : 0.6,
                            'green' : 0.3,
                            'blue' : 0.1,
                            'alpha' : 1.0
                        },
                        'u_darkWoodColor' : {
                            'red' : 0.4,
                            'green' : 0.2,
                            'blue' : 0.07,
                            'alpha' : 1.0
                        },
                        'u_ringFrequency' : 3.0,
                        'u_noiseScale' : {
                            'x' : 0.7,
                            'y' : 0.5
                        },
                        'u_grainFrequency' : 27.0
                    },
                    'sourcePath' : 'WoodMaterial'
                }
            });

            primitives.add(polygon);
        }