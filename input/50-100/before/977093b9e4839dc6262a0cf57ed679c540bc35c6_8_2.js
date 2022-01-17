function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-75.10, 39.57),  // Philadelphia
                new Cesium.Cartographic2(-77.02, 38.53),  // Washington, D.C.
                new Cesium.Cartographic2(-80.50, 35.14),  // Charlotte
                new Cesium.Cartographic2(-80.12, 25.46)   // Miami
            ]));

            primitives.add(polyline);
        }