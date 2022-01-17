function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-75.10, 39.57),  // Philadelphia
                Cesium.Cartographic.fromDegrees(-80.12, 25.46)   // Miami
            ]));

            polyline.width = 5;          // Request 5 pixels interior
            polyline.outlineWidth = 10;  // Request 10 pixels total

            primitives.add(polyline);
        }