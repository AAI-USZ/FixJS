function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(Cesium.Shapes.computeCircleBoundary(
                ellipsoid, ellipsoid.cartographicToCartesian(
                        Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)), 300000.0));

            primitives.add(polygon);
        }