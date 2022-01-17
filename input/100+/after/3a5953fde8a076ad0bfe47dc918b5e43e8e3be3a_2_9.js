function() {
        var expected = new Matrix2(1.0, 2.0, 3.0, 4.0);
        var matrix = Matrix2.fromRowMajorArray([1.0, 3.0, 2.0, 4.0]);
        expect(matrix).toEqual(expected);
    }