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
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'ReflectionMaterial',
                    'uniforms' : {
                        'cubeMap' : {
                            'positiveX' : '../../Images/PalmTreesCubeMap/posx.jpg',
                            'negativeX' : '../../Images/PalmTreesCubeMap/negx.jpg',
                            'positiveY' : '../../Images/PalmTreesCubeMap/negy.jpg',
                            'negativeY' : '../../Images/PalmTreesCubeMap/posy.jpg',
                            'positiveZ' : '../../Images/PalmTreesCubeMap/posz.jpg',
                            'negativeZ' : '../../Images/PalmTreesCubeMap/negz.jpg'
                        },
                        'reflectionChannels' : 'rgb'
                    }
                }
            });

            primitives.add(polygon);
        }