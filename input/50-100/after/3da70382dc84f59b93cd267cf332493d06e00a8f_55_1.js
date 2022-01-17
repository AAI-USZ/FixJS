function() {
        var height = 10.0;
        var cartographic = new Cartographic(0.0, 0.0, height);
        var projection = new EquidistantCylindricalProjection();
        expect(projection.project(cartographic).equals(new Cartesian3(0.0, 0.0, height))).toEqual(true);
    }