function() {
        var m = new Matrix3(1, 2, 3,
                            4, 5, 6,
                            7, 8, 9);
        var n = new Matrix3(-1, -2, -3,
                            -4, -5, -6,
                            -7, -8, -9);

        expect(m.negate().equals(n)).toEqual(true);
        expect(m.negate().negate().equals(m)).toEqual(true);
    }