function() {
        var ellipsoid = Ellipsoid.UNIT_SPHERE;
        var cartographic = new Cartographic(-Math.PI, CesiumMath.PI_OVER_FOUR, 0.0);
        var expected = new Cartesian3(-Math.PI, 0.820329694342107, 0.0);
        var projection = new MercatorProjection(ellipsoid);
        expect(projection.project(cartographic).equalsEpsilon(expected, CesiumMath.EPSILON15)).toEqual(true);
    }