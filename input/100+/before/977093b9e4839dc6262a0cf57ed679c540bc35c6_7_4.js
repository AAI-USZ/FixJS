function() {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-80.0, 30.0),
                new Cesium.Cartographic2(-70.0, 30.0),
                new Cesium.Cartographic2(-70.0, 33.0),
                new Cesium.Cartographic2(-80.0, 33.0)
            ]));

            var image = new Image();
            image.onload = function() {
                polygon.material = new Cesium.DiffuseMapMaterial({
                    texture : scene.getContext().createTexture2D({
                            source : image,
                            pixelFormat : Cesium.PixelFormat.RGB
                    }),
                    sRepeat : 1,
                    tRepeat : 1
                });
            };
            image.src = '../../Images/Cesium_Logo_Color.jpg';

            primitives.add(polygon);
        }