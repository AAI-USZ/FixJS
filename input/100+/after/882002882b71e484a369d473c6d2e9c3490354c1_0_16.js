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
                    'id' : 'WoodMaterial',
                    'uniforms' : {
                        'lightWoodColor' : {
                            'red' : 0.6,
                            'green' : 0.3,
                            'blue' : 0.1,
                            'alpha' : 1.0
                        },
                        'darkWoodColor' : {
                            'red' : 0.4,
                            'green' : 0.2,
                            'blue' : 0.07,
                            'alpha' : 1.0
                        },
                        'ringFrequency' : 3.0,
                        'noiseScale' : {
                            'x' : 0.7,
                            'y' : 0.5
                        },
                        'grainFrequency' : 27.0
                    }
                }
            });

            primitives.add(polygon);
        }