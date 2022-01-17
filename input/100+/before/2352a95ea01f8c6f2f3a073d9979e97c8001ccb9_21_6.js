function() {
        var m = new Matrix3(1, 2, 3,
                            4, 5, 6,
                            7, 8, 9);
        var m2 = new Matrix3(1, 2, 3,
                             4, 5, 6,
                             7, 8, 9);
        expect(m.equals(m2)).toEqual(true);
    }