function() {
        var v = new Cartesian4(1, 2, 3, 4);
        var w = v.clone();
        expect(v.equals(w)).toEqual(true);
    }