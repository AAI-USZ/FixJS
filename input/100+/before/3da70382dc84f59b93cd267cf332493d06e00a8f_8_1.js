function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-75.10, 39.57),  // Philadelphia
                new Cesium.Cartographic2(-80.12, 25.46)   // Miami
            ]));

            polyline.color = { red : 1.0, green : 1.0, blue : 0.0, alpha : 1.0 };        // Yellow interior
            polyline.outlineColor = { red : 1.0, green : 0.0, blue : 0.0, alpha : 1.0 }; // Red outline

            primitives.add(polyline);
        }