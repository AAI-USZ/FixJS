function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.toCartesian(Cartographic3.ZERO);
        expect(function() {
            Shapes.computeCircleBoundary(ellipsoid, center);
        }).toThrow();
    }