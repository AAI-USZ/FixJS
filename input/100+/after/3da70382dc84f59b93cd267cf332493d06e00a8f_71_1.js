function createPolygon() {
        var ellipsoid = Ellipsoid.UNIT_SPHERE;

        var p = new Polygon();
        p.ellipsoid = ellipsoid;
        p.granularity = CesiumMath.toRadians(20.0);
        p.setPositions([
            ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(-50.0, -50.0, 0.0)),
            ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(50.0, -50.0, 0.0)),
            ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(50.0, 50.0, 0.0)),
            ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(-50.0, 50.0, 0.0))
        ]);

        return p;
    }