function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic3(-75.10, 39.57),  // Philadelphia
                new Cesium.Cartographic3(-80.12, 25.46)   // Miami
            ]));

            primitives.add(polyline);
        }