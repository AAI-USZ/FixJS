function() {
        var matrix = Matrix2.fromComponents(1.0, 2.0, 3.0, 4.0);
        var result = new Matrix2();

        var expected = Matrix2.fromComponents(5.0, 6.0, 3.0, 4.0);
        var returnedResult = matrix.setRow(0, new Cartesian2(5.0, 6.0), result);
        expect(result).toBe(returnedResult);
        expect(result).toEqual(expected);

        expected = Matrix2.fromComponents(1.0, 2.0, 7.0, 8.0);
        returnedResult = matrix.setRow(1, new Cartesian2(7.0, 8.0), result);
        expect(result).toBe(returnedResult);
        expect(result).toEqual(expected);
    }