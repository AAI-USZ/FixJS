function() {
        var v = new Cartesian2(1, 2).multiplyWithScalar(2);
        expect(v.equals(new Cartesian2(2, 4))).toEqual(true);
    }