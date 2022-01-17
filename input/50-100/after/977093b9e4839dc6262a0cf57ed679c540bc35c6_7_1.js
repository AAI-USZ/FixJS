function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic3(-72.0, 40.0),
                new Cesium.Cartographic3(-70.0, 35.0),
                new Cesium.Cartographic3(-75.0, 30.0),
                new Cesium.Cartographic3(-70.0, 30.0),
                new Cesium.Cartographic3(-68.0, 40.0)
            ]));

            primitives.add(polygon);
        }