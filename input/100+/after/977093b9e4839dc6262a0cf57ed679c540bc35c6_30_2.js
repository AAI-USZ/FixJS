function() {
        var ellipsoid = Ellipsoid.WGS84;
        var p1 = Cartographic3.ZERO;
        var p2 = new Cartographic3(CesiumMath.toRadians(45), CesiumMath.toRadians(-60), -123.4);
        var p3 = new Cartographic3(CesiumMath.toRadians(-97.3), CesiumMath.toRadians(71.2), 1188.7);
        var cartesians = [ellipsoid.toCartesian(p1),
                          ellipsoid.toCartesian(p2),
                          ellipsoid.toCartesian(p3)];
        var cartographics = ellipsoid.toCartographic3s(cartesians);
        expect(cartographics[0]).toEqualEpsilon(p1, CesiumMath.EPSILON6);
        expect(cartographics[1]).toEqualEpsilon(p2, CesiumMath.EPSILON6);
        expect(cartographics[2]).toEqualEpsilon(p3, CesiumMath.EPSILON6);
    }