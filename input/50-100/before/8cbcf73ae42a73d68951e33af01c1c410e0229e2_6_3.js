function() {
        var v = new Cartesian2(2, 0).normalize();
        expect(v.x).toEqual(1);
        expect(v.y).toEqual(0);
    }