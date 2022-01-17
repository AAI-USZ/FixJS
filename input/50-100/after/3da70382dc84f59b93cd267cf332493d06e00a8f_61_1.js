function() {
        var ellipsoid = Ellipsoid.WGS84;
        var center = ellipsoid.cartographicToCartesian(Cartographic.ZERO);
        var positions = Shapes.computeCircleBoundary(ellipsoid, center, 1.0);

        expect(positions[0].equals(positions[positions.length - 1])).toEqual(true);
    }