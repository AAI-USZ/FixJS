function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-72.0, 40.0),
                Cesium.Cartographic.fromDegrees(-70.0, 35.0),
                Cesium.Cartographic.fromDegrees(-75.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 30.0),
                Cesium.Cartographic.fromDegrees(-68.0, 40.0)
            ]));

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'ColorMaterial',
                    'uniforms' : {
                        'u_color' : {
                            'red' : 1,
                            'green' : 0,
                            'blue' : 0,
                            'alpha' : 1
                        }
                    },
                    'sourcePath' : 'ColorMaterial'
                }
             });

            // The color's alpha component defines the polygon's opacity.
            // 0 - completely transparent.  1.0 - completely opaque.
            polygon.material.u_color = {
                red : 1.0,
                green : 0.0,
                blue : 0.0,
                alpha : 0.75
            };

            primitives.add(polygon);
        }