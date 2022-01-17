function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-75.10, 39.57),  // Philadelphia
                Cesium.Cartographic.fromDegrees(-80.12, 25.46)   // Miami
            ]));

            primitives.add(polyline);
        }