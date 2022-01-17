function() {
        var v = new Cartesian3(1, 2, 3).add(new Cartesian3(4, 5, 6));
        expect(v.equals(new Cartesian3(5, 7, 9))).toEqual(true);
    }