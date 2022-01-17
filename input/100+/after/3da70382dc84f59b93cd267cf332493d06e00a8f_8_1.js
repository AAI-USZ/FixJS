function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-75.10, 39.57),  // Philadelphia
                Cesium.Cartographic.fromDegrees(-80.12, 25.46)   // Miami
            ]));

            polyline.color = { red : 1.0, green : 1.0, blue : 0.0, alpha : 1.0 };        // Yellow interior
            polyline.outlineColor = { red : 1.0, green : 0.0, blue : 0.0, alpha : 1.0 }; // Red outline

            primitives.add(polyline);
        }