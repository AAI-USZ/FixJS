function() {
        var v = new Cartesian4(1, 2, 3);
        expect(v.x).toEqual(1);
        expect(v.y).toEqual(2);
        expect(v.z).toEqual(3);
        expect(v.w).toEqual(0);
    }