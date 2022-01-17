function() {
        var cartographic = new Cartographic(CesiumMath.PI_OVER_TWO, CesiumMath.PI_OVER_FOUR, 12.0);
        var projection = new EquidistantCylindricalProjection();
        var projected = projection.project(cartographic);
        expect(projection.unproject(projected).equals(cartographic)).toEqual(true);
    }