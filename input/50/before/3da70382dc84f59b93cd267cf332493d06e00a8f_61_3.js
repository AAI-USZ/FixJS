function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.toCartesian(Cartographic3.ZERO);
        expect(function() {
            Shapes.computeEllipseBoundary(ellipsoid, center, 1.0);
        }).toThrow();
    }