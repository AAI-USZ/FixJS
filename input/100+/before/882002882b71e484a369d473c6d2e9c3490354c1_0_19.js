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
                    'id' : 'GrassMaterial',
                    'uniforms' : {
                        'grassColor' : {
                            'red' : 0.25,
                            'green' : 0.4,
                            'blue' : 0.1,
                            'alpha' : 1.0
                        },
                        'dirtColor' : {
                            'red' : 0.1,
                            'green' : 0.1,
                            'blue' : 0.1,
                            'alpha' : 1.0
                        },
                        'patchiness' : 1.5
                    },
                    'sourcePath' : 'GrassMaterial'
                }
            });

            primitives.add(polygon);
        }