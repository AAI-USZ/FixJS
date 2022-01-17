function() {
        var v = new Cartesian3(1, 2, 3);
        expect(v.getXY().equals(new Cartesian2(1, 2))).toEqual(true);
        expect(v.z).toEqual(3);
    }