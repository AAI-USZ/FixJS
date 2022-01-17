function() {
        var s = new Cartesian2(2, 3).dot(new Cartesian2(4, 5));
        expect(s).toEqual(2 * 4 + 3 * 5);
    }