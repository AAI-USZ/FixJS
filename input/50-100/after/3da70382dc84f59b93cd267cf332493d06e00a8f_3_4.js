function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(Cesium.Shapes.computeEllipseBoundary(
                ellipsoid, ellipsoid.cartographicToCartesian(
                        Cesium.Cartographic.fromDegrees(-75.59777, 40.03883)), 500000.0, 300000.0, Cesium.Math.toRadians(60)));

            primitives.add(polygon);
        }