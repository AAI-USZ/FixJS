function() {
        var box = new AxisAlignedBoundingBox(positions);
        expect(box.center.equalsEpsilon(Cartesian3.ZERO, Math.EPSILON14)).toEqual(true);
    }