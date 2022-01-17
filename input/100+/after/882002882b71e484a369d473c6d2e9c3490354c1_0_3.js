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
                        'texture': '../../Images/earthspec1k.jpg'
                    },
                    'materials': {
                        'bumpMapMaterial': {
                            'id': 'BumpMapMaterial',
                            'uniforms' : {
                                'texture' : '../../Images/earthbump1k.jpg'
                            }
                        },
                        'grassMaterial': {
                            'id': 'GrassMaterial'
                        },
                        'waterMaterial': {
                            'materials': {
                                'blobMaterial': {
                                    'id': 'BlobMaterial',
                                    'uniforms': {
                                        'lightColor': {
                                            'red': 0.4,
                                            'green': 0.4,
                                            'blue': 0.8
                                        },
                                        'darkColor': {
                                            'red': 0.1,
                                            'green': 0.1,
                                            'blue': 0.8
                                        },
                                        'frequency': 50.0
                                    }
                                },
                                'reflectionMaterial': {
                                    'id': 'ReflectionMaterial',
                                    'uniforms' : {
                                        'cubeMap' : {
                                            'positiveX' : '../../Images/PalmTreesCubeMap/posx.jpg',
                                            'negativeX' : '../../Images/PalmTreesCubeMap/negx.jpg',
                                            'positiveY' : '../../Images/PalmTreesCubeMap/negy.jpg',
                                            'negativeY' : '../../Images/PalmTreesCubeMap/posy.jpg',
                                            'positiveZ' : '../../Images/PalmTreesCubeMap/posz.jpg',
                                            'negativeZ' : '../../Images/PalmTreesCubeMap/negz.jpg'
                                        }
                                    }
                                }
                            },
                            'components': {
                                'diffuse': 'blobMaterial.diffuse + reflectionMaterial.diffuse * 0.1'
                            }
                        }
                    },
                    'components': {
                        'diffuse': 'mix(grassMaterial.diffuse, waterMaterial.diffuse, texture2D(texture, materialInput.st).r)',
                        'specular': 'texture2D(texture, materialInput.st).r / 10.0',
                        'normal': 'bumpMapMaterial.normal'
                    }
                }
            });

            primitives.add(polygon);
        }