function createPolygon() {
        var ellipsoid = Ellipsoid.UNIT_SPHERE;
        var polygon = new Polygon();
        polygon.ellipsoid = ellipsoid;
        polygon.granularity = CesiumMath.toRadians(20.0);
        polygon.setPositions([
                              ellipsoid.toCartesian(CesiumMath.cartographic3ToRadians(new Cartographic3(-50.0, -50.0, 0.0))),
                              ellipsoid.toCartesian(CesiumMath.cartographic3ToRadians(new Cartographic3(50.0, -50.0, 0.0))),
                              ellipsoid.toCartesian(CesiumMath.cartographic3ToRadians(new Cartographic3(50.0, 50.0, 0.0))),
                              ellipsoid.toCartesian(CesiumMath.cartographic3ToRadians(new Cartographic3(-50.0, 50.0, 0.0)))
                             ]);
        return polygon;
    }