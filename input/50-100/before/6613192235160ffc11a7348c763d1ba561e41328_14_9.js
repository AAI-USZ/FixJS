function() {
        var v = Cartesian4.UNIT_W;
        expect(v.x).toEqual(0);
        expect(v.y).toEqual(0);
        expect(v.z).toEqual(0);
        expect(v.w).toEqual(1);
    }