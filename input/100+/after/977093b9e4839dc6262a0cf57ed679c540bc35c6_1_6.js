function() {

                var billboards = new Cesium.BillboardCollection(undefined);
                var textureAtlas = scene.getContext().createTextureAtlas({image : image});
                billboards.setTextureAtlas(textureAtlas);

                var center = ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883));
                billboards.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
                billboards.add({ position : new Cesium.Cartesian3(0.0, 0.0, 0.0) }); // center
                billboards.add({ position : new Cesium.Cartesian3(1000000.0, 0.0, 0.0) }); // east
                billboards.add({ position : new Cesium.Cartesian3(0.0, 1000000.0, 0.0) }); // north
                billboards.add({ position : new Cesium.Cartesian3(0.0, 0.0, 1000000.0) }); // up
                primitives.add(billboards);
            }