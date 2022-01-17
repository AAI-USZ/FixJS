function() {
        var x = Cartesian3.UNIT_X;
        var y = Cartesian3.UNIT_Y;
        expect(x.angleBetween(x)).toEqual(0);
        expect(x.angleBetween(y)).toEqual(CesiumMath.PI_OVER_TWO);
    }