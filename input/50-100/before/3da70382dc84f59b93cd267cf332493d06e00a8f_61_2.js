function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.toCartesian(Cartographic3.ZERO);
        var positions = Shapes.computeCircleBoundary(ellipsoid, center, 1.0, CesiumMath.toRadians(60));

        expect(positions.length).toEqual(10);
    }