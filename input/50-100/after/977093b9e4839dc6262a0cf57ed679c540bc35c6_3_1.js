function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(Cesium.Shapes.computeCircleBoundary(
                ellipsoid, ellipsoid.cartographicDegreesToCartesian(
                    new Cesium.Cartographic3(-75.59777, 40.03883)), 300000.0));

            primitives.add(polyline);
        }