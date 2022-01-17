function() {
        var ellipsoid = new Ellipsoid(new Cartesian3(1, 1, 0.7));
        expect(new Cartesian3(2, 0, 0).equalsEpsilon(ellipsoid.cartographicToCartesian(new Cartographic(0, 0, 1)), CesiumMath.EPSILON10)).toEqual(true);
        expect(new Cartesian3(0, 2, 0).equalsEpsilon(ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(90, 0, 1)), CesiumMath.EPSILON10)).toEqual(true);
        expect(new Cartesian3(0, 0, 1.7).equalsEpsilon(ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(0, 90, 1)), CesiumMath.EPSILON10)).toEqual(true);
    }