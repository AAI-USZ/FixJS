function() {
                var billboards = new Cesium.BillboardCollection(undefined);
                var textureAtlas = scene.getContext().createTextureAtlas({image : image});
                billboards.setTextureAtlas(textureAtlas);
                billboards.add({
                    position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883)),
                    imageIndex : 0
                });
                primitives.add(billboards);
            }