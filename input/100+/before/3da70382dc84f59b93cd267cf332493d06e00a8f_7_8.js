function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-80.0, 27.0),
                new Cesium.Cartographic2(-70.0, 27.0),
                new Cesium.Cartographic2(-70.0, 36.0),
                new Cesium.Cartographic2(-80.0, 36.0)
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
                    'id' : 'EmissionMapMaterial',
                    'uniforms' : {
                        'u_texture' : '../../Images/alpha_map.png',
                        'emissionChannels' : 'rgb',
                        'u_repeat' : {
                            'x' : 1,
                            'y' : 1
                        }
                    },
                    'sourcePath' : 'EmissionMapMaterial'
                }
            });

            primitives.add(polygon);
        }