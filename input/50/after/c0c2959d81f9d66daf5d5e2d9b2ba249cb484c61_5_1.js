function() {
        var box = new AxisAlignedBoundingBox(positions);
        expect(box.center.equalsEpsilon(Cartesian3.ZERO, CesiumMath.EPSILON14)).toEqual(true);
    }