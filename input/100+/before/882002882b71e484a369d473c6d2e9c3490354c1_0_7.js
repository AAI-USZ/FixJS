function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-80.0, 27.0),
                Cesium.Cartographic.fromDegrees(-70.0, 27.0),
                Cesium.Cartographic.fromDegrees(-70.0, 36.0),
                Cesium.Cartographic.fromDegrees(-80.0, 36.0)
            ]));

            polygon.material.color = {
                    red: 1.0,
                    green: 1.0,
                    blue: 1.0,
                    alpha: 1.0
            };

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'AlphaMapMaterial',
                    'uniforms' : {
                        'texture' : '../../Images/alpha_map.png',
                        'alphaChannel' : 'r',
                        'repeat' : {
                            'x' : 1,
                            'y' : 1
                        }
                    },
                    'sourcePath' : 'AlphaMapMaterial'
                }
            });

            primitives.add(polygon);
        }