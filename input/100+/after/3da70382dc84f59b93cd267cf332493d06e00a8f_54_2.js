function() {
        var ellipsoid = Ellipsoid.WGS84;

        expect(Cartographic.ZERO.equalsEpsilon(ellipsoid.cartesianToCartographic(ellipsoid.cartographicToCartesian(Cartographic.ZERO)), CesiumMath.EPSILON8)).toEqual(true);

        var p = Cartographic.fromDegrees(45, -60, -123.4);
        expect(p.equalsEpsilon(ellipsoid.cartesianToCartographic(ellipsoid.cartographicToCartesian(p)), CesiumMath.EPSILON3)).toEqual(true);

        var p2 = Cartographic.fromDegrees(-97.3, 71.2, 1188.7);
        expect(p2.equalsEpsilon(ellipsoid.cartesianToCartographic(ellipsoid.cartographicToCartesian(p2)), CesiumMath.EPSILON3)).toEqual(true);
    }