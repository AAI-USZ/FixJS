function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-80.0, 30.0),
                new Cesium.Cartographic2(-70.0, 30.0),
                new Cesium.Cartographic2(-70.0, 33.0),
                new Cesium.Cartographic2(-80.0, 33.0)
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
                   'id' : 'DiffuseMapMaterial',
                   'uniforms' : {
                       'u_repeat' : {
                           'x' : 1,
                           'y' : 1
                       },
                       'u_texture' : '../../Images/Cesium_Logo_Color.jpg',
                       'diffuseChannels' : 'rgb',
                       'alphaChannel' : 'a'
                   },
                   'sourcePath' : 'DiffuseMapMaterial'
               }
            });

            primitives.add(polygon);
        }