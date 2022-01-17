function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.cartographicToCartesian(Cartographic.ZERO);
        expect(function() {
            Shapes.computeCircleBoundary(ellipsoid, center);
        }).toThrow();
    }