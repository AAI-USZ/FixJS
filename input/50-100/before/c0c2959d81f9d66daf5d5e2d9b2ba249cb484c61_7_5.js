function() {
        var v = new Cartesian3(1, 2, 3).multiplyWithScalar(2);
        expect(v.equals(new Cartesian3(2, 4, 6))).toEqual(true);
    }