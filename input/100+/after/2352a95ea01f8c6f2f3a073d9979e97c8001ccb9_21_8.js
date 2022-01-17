function() {
        var matrix = new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0);
        var expected = new Matrix3(-1.0, -2.0, -3.0, -4.0, -5.0, -6.0, -7.0, -8.0, -9.0);
        var result = new Matrix3();
        var returnedResult = matrix.negate(result);
        expect(result).toBe(returnedResult);
        expect(result).toEqual(expected);
    }