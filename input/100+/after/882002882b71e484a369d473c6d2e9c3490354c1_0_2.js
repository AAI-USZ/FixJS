function() {
            var polygon = new Cesium.Polygon(undefined);

            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-100.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 20.0),
                Cesium.Cartographic.fromDegrees(-70.0, 33.0),
                Cesium.Cartographic.fromDegrees(-100.0, 33.0)
            ]));

            polygon.material = new Cesium.Material({
                'context': scene.getContext(),
                'template': {
                    'uniforms': {
                        'values': [0.0, 0.5, 1.0, 1.0],
                        'moreValues': {
                            'type': 'bvec3',
                            'x': 0,
                            'y': 1,
                            'z': 0
                        }
                    },
                    'components': {
                        'diffuse': 'vec3(values[0].y, moreValues.y, 0.0)'
                    }
                }
            });

            primitives.add(polygon);
        }