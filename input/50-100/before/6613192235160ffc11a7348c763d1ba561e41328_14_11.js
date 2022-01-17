function() {
        var v = new Cartesian4(1, 2, 3, 4);
        expect(v.getMinimumComponent()).toEqual(1);
    }