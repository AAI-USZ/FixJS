function() {
        var v = new Cartesian4(1, 2, 3, 4);
        expect(v.getXY().equals(new Cartesian2(1, 2))).toEqual(true);
        expect(v.z).toEqual(3);
        expect(v.w).toEqual(4);
    }