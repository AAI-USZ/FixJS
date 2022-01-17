function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.toCartesian(Cartographic3.ZERO);
        var points = Shapes.computeEllipseBoundary(ellipsoid, center, 1.0, 5.0);
        expect(points.length).toBeGreaterThan(0);
    }