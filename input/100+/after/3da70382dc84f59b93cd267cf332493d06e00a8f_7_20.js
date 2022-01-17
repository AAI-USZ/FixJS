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
                    'id' : 'CheckerboardMaterial',
                    'uniforms' : {
                        'u_lightColor' : {
                            'red' : 1.0,
                            'green' : 1.0,
                            'blue' : 0.0,
                            'alpha' : 0.75
                        },
                        'u_darkColor' : {
                            'red' : 0.0,
                            'green' : 1.0,
                            'blue' : 1.0,
                            'alpha' : 0.75
                        },
                        'u_repeat' : {
                            'x' : 5.0,
                            'y' : 5.0
                        }
                    },
                    'sourcePath' : 'CheckerboardMaterial'
                }
            });

            primitives.add(polygon);
        }