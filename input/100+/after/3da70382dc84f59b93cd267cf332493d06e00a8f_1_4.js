function() {
                var billboards = new Cesium.BillboardCollection(undefined);
                var textureAtlas = scene.getContext().createTextureAtlas({image : image});
                billboards.setTextureAtlas(textureAtlas);
                billboards.add({
                    show : true, // default
                    position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)),
                    pixelOffset : new Cesium.Cartesian2(0, 50), // default: (0, 0)
                    eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                    scale : 2.0, // default : 1.0
                    imageIndex : 0, // default
                    color : { red : 0.0, green : 1.0, blue : 0.0, alpha : 1.0 } // default: all 255
                });
                primitives.add(billboards);
            }