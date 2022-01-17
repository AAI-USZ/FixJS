function() {
        var s = new Cartesian3(2, 3, 4).dot(new Cartesian3(5, 6, 7));
        expect(s).toEqual(2 * 5 + 3 * 6 + 4 * 7);
    }