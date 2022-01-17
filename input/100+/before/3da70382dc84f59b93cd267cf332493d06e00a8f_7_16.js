function() {
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
                    'id' : 'AsphaltMaterial',
                    'uniforms' : {
                        'u_asphaltColor' : {
                            'red' : 0.15,
                            'green' : 0.15,
                            'blue' : 0.15,
                            'alpha' : 1.0
                        },
                        'u_bumpSize' : 0.02,
                        'u_roughness' : 0.2
                    },
                    'sourcePath' : 'AsphaltMaterial'
                }
            });

            primitives.add(polygon);
        }