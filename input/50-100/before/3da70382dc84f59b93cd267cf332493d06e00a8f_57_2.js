function() {
        var ellipsoid = Ellipsoid.WGS84;
        var cartographic = new Cartographic3(Math.PI, CesiumMath.PI_OVER_FOUR, 0.0);
        var expected = new Cartesian3(Math.PI * ellipsoid.getRadii().x, 0.820329694342107 * ellipsoid.getRadii().z, 0.0);
        var projection = new MercatorProjection(ellipsoid);
        expect(projection.project(cartographic).equalsEpsilon(expected, CesiumMath.EPSILON8)).toEqual(true);
    }