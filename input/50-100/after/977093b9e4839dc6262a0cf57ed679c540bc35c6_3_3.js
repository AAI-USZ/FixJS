function () {
            var polygon = new Cesium.Polygon(undefined);
            polygon.setPositions(Cesium.Shapes.computeCircleBoundary(
                ellipsoid, ellipsoid.cartographicDegreesToCartesian(
                    new Cesium.Cartographic3(-75.59777, 40.03883)), 300000.0));
            // Any polygon-compatible material can be used
            polygon.material = new Cesium.TieDyeMaterial(undefined);

            primitives.add(polygon);
        }