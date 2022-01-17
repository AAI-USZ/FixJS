function() {
        var left = new Matrix2(1.0, 2.0, 3.0, 4.0);
        var right = new Matrix2(1.0, 2.0, 3.0, 4.0);
        expect(left.equalsEpsilon(right, 1.0)).toEqual(true);

        left = new Matrix2(1.0, 2.0, 3.0, 4.0);
        right = new Matrix2(5.0, 2.0, 3.0, 4.0);
        expect(left.equalsEpsilon(right, 3.9)).toEqual(false);
        expect(left.equalsEpsilon(right, 4.0)).toEqual(true);

        left = new Matrix2(1.0, 2.0, 3.0, 4.0);
        right = new Matrix2(1.0, 6.0, 3.0, 4.0);
        expect(left.equalsEpsilon(right, 3.9)).toEqual(false);
        expect(left.equalsEpsilon(right, 4.0)).toEqual(true);

        left = new Matrix2(1.0, 2.0, 3.0, 4.0);
        right = new Matrix2(1.0, 2.0, 7.0, 4.0);
        expect(left.equalsEpsilon(right, 3.9)).toEqual(false);
        expect(left.equalsEpsilon(right, 4.0)).toEqual(true);

        left = new Matrix2(1.0, 2.0, 3.0, 4.0);
        right = new Matrix2(1.0, 2.0, 3.0, 8.0);
        expect(left.equalsEpsilon(right, 3.9)).toEqual(false);
        expect(left.equalsEpsilon(right, 4.0)).toEqual(true);
    }