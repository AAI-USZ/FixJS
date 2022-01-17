function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.toCartesian(Cartographic3.ZERO);
        expect(function() {
            Shapes.computeCircleBoundary(ellipsoid, center, 1.0, -1.0);
        }).toThrow();
    }