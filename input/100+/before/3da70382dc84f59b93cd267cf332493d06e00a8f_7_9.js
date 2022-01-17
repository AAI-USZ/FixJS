function() {
            var polygon = new Cesium.Polygon();
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
            new Cesium.Cartographic2(-90.0, 27.0), new Cesium.Cartographic2(-70.0, 27.0), new Cesium.Cartographic2(-70.0, 36.0), new Cesium.Cartographic2(-90.0, 36.0)]));

            polygon.material.color = {
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0
            };

            polygon.material = new Cesium.Material({
                'context' : scene.getContext(),
                'template' : {
                    'id' : 'BumpMapMaterial',
                    'uniforms' : {
                        'u_texture' : '../../Images/earthbump1k.jpg',
                        'bumpMapChannel' : 'r',
                        'u_repeat' : {
                            'x' : 1,
                            'y' : 1
                        }
                    },
                    'sourcePath' : 'BumpMapMaterial',
                    'components' : {
                        'diffuse' : 'vec3(0.3, 0.3, 0.3)',
                        'specular' : '0.01'
                    }
                }
            });

            primitives.add(polygon);
        }