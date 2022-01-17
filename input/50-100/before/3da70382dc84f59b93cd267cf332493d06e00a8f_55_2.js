function() {
        var ellipsoid = Ellipsoid.WGS84;
        var cartographic = new Cartographic3(Math.PI, CesiumMath.PI_OVER_TWO, 0.0);
        var expected = new Cartesian3(Math.PI * ellipsoid.getRadii().x, CesiumMath.PI_OVER_TWO * ellipsoid.getRadii().z, 0.0);
        var projection = new EquidistantCylindricalProjection(ellipsoid);
        expect(projection.project(cartographic).equals(expected)).toEqual(true);
    }