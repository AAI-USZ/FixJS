function() {
                var billboards = new Cesium.BillboardCollection(undefined);
                var textureAtlas = scene.getContext().createTextureAtlas({borderWidthInPixels : 0});
                // Break one image full of markers into many subregions.
                textureAtlas.addSubRegions(image, [
                    // Dots, small to large, imageIndex 1 to 6
                    { x:91, y:11, width:6, height:6 },
                    { x:81, y:9, width:10, height:10 },
                    { x:67, y:7, width:14, height:14 },
                    { x:49, y:5, width:18, height:18 },
                    { x:27, y:3, width:22, height:22 },
                    { x:1, y:1, width:26, height:26 },
                    // Up-Triangles, small to large, imageIndex 7 to 12
                    { x:91, y:49, width:6, height:6 },
                    { x:81, y:47, width:10, height:10 },
                    { x:67, y:45, width:14, height:14 },
                    { x:49, y:43, width:18, height:18 },
                    { x:27, y:41, width:22, height:22 },
                    { x:1, y:39, width:26, height:26 },
                    // Down-Triangles, small to large, imageIndex 13 to 18
                    { x:31, y:29, width:6, height:6 },
                    { x:37, y:27, width:10, height:10 },
                    { x:47, y:25, width:14, height:14 },
                    { x:61, y:23, width:18, height:18 },
                    { x:79, y:21, width:22, height:22 },
                    { x:101, y:19, width:26, height:26 },
                    // Up-Arrows, small to large, imageIndex 19 to 24
                    { x:91, y:84, width:6, height:6 },
                    { x:81, y:82, width:10, height:10 },
                    { x:67, y:80, width:14, height:14 },
                    { x:49, y:78, width:18, height:18 },
                    { x:27, y:76, width:22, height:22 },
                    { x:1, y:74, width:26, height:26 },
                    // Down-Arrows, small to large, imageIndex 25 to 30
                    { x:31, y:66, width:6, height:6 },
                    { x:37, y:64, width:10, height:10 },
                    { x:47, y:62, width:14, height:14 },
                    { x:61, y:60, width:18, height:18 },
                    { x:79, y:58, width:22, height:22 },
                    { x:101, y:56, width:26, height:26 },
                    // X's, small to large, imageIndex 31 to 36
                    { x:91, y:111, width:6, height:6 },
                    { x:81, y:109, width:10, height:10 },
                    { x:67, y:107, width:14, height:14 },
                    { x:49, y:105, width:18, height:18 },
                    { x:27, y:103, width:22, height:22 },
                    { x:1, y:101, width:26, height:26 },
                    // Plus's, small to large, imageIndex 37 to 42
                    { x:92, y:120, width:5, height:5 },
                    { x:109, y:109, width:10, height:10 },
                    { x:107, y:107, width:14, height:14 },
                    { x:105, y:105, width:18, height:18 },
                    { x:103, y:103, width:22, height:22 },
                    { x:101, y:101, width:26, height:26 }
                ]);
                billboards.setTextureAtlas(textureAtlas);
                // Add several billboards based on the above marker definitions.
                billboards.add({
                    position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)),
                    imageIndex: 10,
                    scale: 1,
                    color: { red: 0, green: 1, blue: 0, alpha: 1 }
                });
                billboards.add({
                    position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-84.0, 39.0)),
                    imageIndex: 16,
                    scale: 1,
                    color: { red: 0, green: 0.5, blue: 1, alpha: 1 }
                });
                billboards.add({
                    position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-70.0, 41.0)),
                    imageIndex: 21,
                    scale: 1,
                    color: { red: 0.5, green: 0.9, blue: 1, alpha: 1 }
                });
                billboards.add({
                    position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-73.0, 37.0)),
                    imageIndex: 35,
                    scale: 1,
                    color: { red: 1, green: 0, blue: 0, alpha: 1 }
                });
                billboards.add({
                    position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-79.0, 35.0)),
                    imageIndex: 40,
                    scale: 1,
                    color: { red: 1, green: 1, blue: 0, alpha: 1 }
                });
                primitives.add(billboards);
            }