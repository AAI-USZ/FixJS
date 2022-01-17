function() {
        var ellipsoid = Ellipsoid.WGS84;
        var sunPos = SunPosition.compute(julianDate12);
        var position = sunPos.position.normalize();
        var cartographicPos = sunPos.cartographicPosition;
        var cartesianPos = ellipsoid.toCartesian(cartographicPos).normalize();
        expect((cartesianPos).equalsEpsilon(position, CesiumMath.EPSILON2)).toEqual(true);
    }