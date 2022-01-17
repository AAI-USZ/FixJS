function (scene, ellipsoid, primitives) {
        this.code = function () {
            Cesium.Chain.run(
                Cesium.Jobs.downloadImage('Images/Cesium_Logo_overlay.png'),
                Cesium.Jobs.downloadImage('Images/facility.gif')).thenRun(
            function () {
                // Once both images are downloaded, they are combined into one image,
                // called a texture atlas, which is assigned to a billboard-collection.
                // Several billboards can be added to the same collection; each billboard
                // references an image in the texture atlas.

                var billboards = new Cesium.BillboardCollection(undefined);
                var images = [this.images['Images/Cesium_Logo_overlay.png'],
                              this.images['Images/facility.gif']];
                var textureAtlas = scene.getContext().createTextureAtlas({images : images});
                billboards.setTextureAtlas(textureAtlas);

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)),
                    imageIndex : 0  // Logo
                });

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.50, 35.14)),
                    imageIndex : 1  // Facility
                });

                billboards.add({
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.12, 25.46)),
                    imageIndex : 1  // Facility
                });

                primitives.add(billboards);
            });
        };
    }