function () {
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
                    'id' : 'FacetMaterial',
                    'uniforms' : {
                        'u_lightColor' : {
                            'red' : 0.25,
                            'green' : 0.25,
                            'blue' : 0.25,
                            'alpha' : 0.75
                        },
                        'u_darkColor' : {
                            'red' : 0.75,
                            'green' : 0.75,
                            'blue' : 0.75,
                            'alpha' : 0.75
                        },
                        'u_frequency' : 10.0
                    },
                    'sourcePath' : 'FacetMaterial'
                }
            });

            primitives.add(polygon);
        }