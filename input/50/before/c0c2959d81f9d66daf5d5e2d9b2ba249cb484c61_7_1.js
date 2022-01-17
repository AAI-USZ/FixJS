function() {
        var v = new Cartesian3(1, 2, 3);
        var w = v.clone();
        expect(v.equals(w)).toEqual(true);
    }