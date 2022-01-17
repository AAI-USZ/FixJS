function() {
        var cartographic = new Cartographic3(CesiumMath.PI_OVER_TWO, CesiumMath.PI_OVER_FOUR, 12.0);
        var projection = new MercatorProjection();
        var projected = projection.project(cartographic);
        expect(projection.unproject(projected).equalsEpsilon(cartographic, CesiumMath.EPSILON14)).toEqual(true);
    }