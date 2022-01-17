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
                    'id' : 'AsphaltMaterial',
                    'uniforms' : {
                        'asphaltColor' : {
                            'red' : 0.15,
                            'green' : 0.15,
                            'blue' : 0.15,
                            'alpha' : 1.0
                        },
                        'bumpSize' : 0.02,
                        'roughness' : 0.2
                    },
                    'sourcePath' : 'AsphaltMaterial'
                }
            });

            primitives.add(polygon);
        }