function() {
        var ellipsoid = Ellipsoid.WGS84;
        var p1 = Cartographic3.ZERO;
        var p2 = new Cartographic3(CesiumMath.toRadians(45), CesiumMath.toRadians(-60), -123.4);
        var p3 = new Cartographic3(CesiumMath.toRadians(-97.3), CesiumMath.toRadians(71.2), 1188.7);
        var cartesians = [ellipsoid.toCartesian(p1),
                          ellipsoid.toCartesian(p2),
                          ellipsoid.toCartesian(p3)];
        var cartographics = ellipsoid.toCartographic3s(cartesians);
        expect(cartographics[0].equalsEpsilon(p1, CesiumMath.EPSILON9)).toEqual(true);
        expect(cartographics[1].equalsEpsilon(p2, CesiumMath.EPSILON9)).toEqual(true);
        expect(cartographics[2].equalsEpsilon(p3, CesiumMath.EPSILON9)).toEqual(true);
    }