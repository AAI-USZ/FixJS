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
                    'id' : 'CementMaterial',
                    'uniforms' : {
                        'cementColor' : {
                            'red' : 0.95,
                            'green' : 0.95,
                            'blue' : 0.85,
                            'alpha' : 1.0
                        },
                        'grainScale' : 0.01,
                        'roughness' : 0.3
                    },
                    'sourcePath' : 'CementMaterial'
                }
            });

            primitives.add(polygon);
        }