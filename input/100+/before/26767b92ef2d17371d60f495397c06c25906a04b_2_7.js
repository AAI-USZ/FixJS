function() {
        var left = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        var right = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        expect(left.equals(right)).toEqual(true);

        left = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        right = Matrix2.fromComponents(5.0, 2.0, 3.0, 4.0);
        expect(left.equals(right)).toEqual(false);

        left = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        right = Matrix2.fromComponents(1.0, 6.0, 3.0, 4.0);
        expect(left.equals(right)).toEqual(false);

        left = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        right = Matrix2.fromComponents(1.0, 2.0, 7.0, 4.0);
        expect(left.equals(right)).toEqual(false);

        left = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        right = Matrix2.fromComponents(1.0, 2.0, 3.0, 8.0);
        expect(left.equals(right)).toEqual(false);
    }