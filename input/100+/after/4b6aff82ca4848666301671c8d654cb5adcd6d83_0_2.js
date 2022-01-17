function(scene, ellipsoid, primitives) {
        this.code = function() {
            Cesium.when.all([
                             Cesium.loadImage('Images/Cesium_Logo_overlay.png'),
                             Cesium.loadImage('Images/facility.gif')
                            ])
                       .then(function(images) {
                // Once both images are downloaded, they are combined into one image,
                // called a texture atlas, which is assigned to a billboard-collection.
                // Several billboards can be added to the same collection; each billboard
                // references an image in the texture atlas.

                var billboards = new Cesium.BillboardCollection();
                var textureAtlas = scene.getContext().createTextureAtlas({
                    images : images
                });
                billboards.setTextureAtlas(textureAtlas);

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)),
                    imageIndex : 0 // Logo
                });

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.50, 35.14)),
                    imageIndex : 1 // Facility
                });

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.12, 25.46)),
                    imageIndex : 1 // Facility
                });

                primitives.add(billboards);
            });
        };
    }