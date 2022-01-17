function() {
                var billboards = new Cesium.BillboardCollection(undefined);
                var textureAtlas = scene.getContext().createTextureAtlas({image : image});
                billboards.setTextureAtlas(textureAtlas);
                // add() returns a Billboard object containing functions to change
                // the billboard's position and appearance.
                var b = billboards.add({
                    position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic2(-75.59777, 40.03883)),
                    imageIndex : 0
                });

                b.setPosition(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883, 300000.0)));
                b.setScale(3.0);
                b.setColor({ red : 1.0, green : 1.0, blue : 1.0, alpha : 0.25 });

                primitives.add(billboards);
            }