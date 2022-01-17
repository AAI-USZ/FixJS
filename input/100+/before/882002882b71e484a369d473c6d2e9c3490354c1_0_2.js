function() {
            var polygon = new Cesium.Polygon(undefined);

            polygon.configureExtent(new Cesium.Extent(
                Cesium.Math.toRadians(-180.0),
                Cesium.Math.toRadians(-90.0),
                Cesium.Math.toRadians(180.0),
                Cesium.Math.toRadians(90.0)));

            polygon.material.color = {
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0
            };

            polygon.material = new Cesium.Material({
                'context': scene.getContext(),
                'template': {
                    'uniforms': {
                        'texture': '../../Images/earthspec1k.jpg',
                        'otherTexture': 'texture',
                        'value': 0.5,
                        'otherValue': 'value'
                    },
                    'materials': {
                        'first': {
                            'id': 'DiffuseMapMaterial',
                            'uniforms': {
                                'texture': 'texture',
                                'amount' : 'value'
                            },
                            'components' : {
                                'diffuse' : 'vec3(amount, 0.0, 0.0)',
                                'alpha' : 'amount'
                            }
                        }
                    },
                    'components': {
                        'diffuse': 'first.diffuse',
                        'specular': 'texture2D(otherTexture, materialInput.st).r / 5.0',
                        'alpha' : 'first.alpha'
                    }
                }
            });

            primitives.add(polygon);
        }