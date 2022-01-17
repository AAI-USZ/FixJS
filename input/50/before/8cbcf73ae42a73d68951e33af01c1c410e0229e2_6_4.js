function() {
        var v = new Cartesian2(1, 2);
        var w = v.clone();
        expect(v.equals(w)).toEqual(true);
    }