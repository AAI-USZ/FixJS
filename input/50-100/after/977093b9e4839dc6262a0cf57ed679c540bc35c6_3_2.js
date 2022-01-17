function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(Cesium.Shapes.computeCircleBoundary(
                ellipsoid, ellipsoid.cartographicDegreesToCartesian(
                    new Cesium.Cartographic3(-75.59777, 40.03883)), 300000.0));

            primitives.add(polygon);
        }