function() {
        var v = new Cartesian4(1, 2, 3, 4).negate();
        expect(v.equals(new Cartesian4(-1, -2, -3, -4))).toEqual(true);
    }