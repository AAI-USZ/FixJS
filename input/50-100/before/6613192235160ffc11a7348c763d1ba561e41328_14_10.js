function() {
        var v = new Cartesian4(1, 2, 3, 4).multiplyComponents(new Cartesian4(5, 6, 7, 8));
        expect(v.equals(new Cartesian4(5, 12, 21, 32))).toEqual(true);
    }