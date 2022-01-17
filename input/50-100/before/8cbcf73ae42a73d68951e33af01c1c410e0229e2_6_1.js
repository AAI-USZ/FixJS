function() {
        var v = new Cartesian2(1, 2);
        var w = Cartesian2.clone(v);
        expect(v.equals(w)).toEqual(true);
    }