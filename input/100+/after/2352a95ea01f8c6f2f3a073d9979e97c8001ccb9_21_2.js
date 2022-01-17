function() {
        var expected = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
        var matrix = Matrix3.fromColumnMajorArray([1.0, 4.0, 7.0, 2.0, 5.0, 8.0, 3.0, 6.0, 9.0]);
        expect(matrix).toEqual(expected);
    }