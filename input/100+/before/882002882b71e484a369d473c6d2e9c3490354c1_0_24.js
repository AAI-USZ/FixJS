function () {
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
                    'id' : 'FacetMaterial',
                    'uniforms' : {
                        'lightColor' : {
                            'red' : 0.25,
                            'green' : 0.25,
                            'blue' : 0.25,
                            'alpha' : 0.75
                        },
                        'darkColor' : {
                            'red' : 0.75,
                            'green' : 0.75,
                            'blue' : 0.75,
                            'alpha' : 0.75
                        },
                        'frequency' : 10.0
                    },
                    'sourcePath' : 'FacetMaterial'
                }
            });

            primitives.add(polygon);
        }