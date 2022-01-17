function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-72.0, 40.0),
                Cesium.Cartographic.fromDegrees(-70.0, 35.0),
                Cesium.Cartographic.fromDegrees(-75.0, 30.0),
                Cesium.Cartographic.fromDegrees(-70.0, 30.0),
                Cesium.Cartographic.fromDegrees(-68.0, 40.0)
            ]));

            primitives.add(polygon);
        }