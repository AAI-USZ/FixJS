function() {
        var left = new Matrix2(1, 2, 3, 4);
        var right = new Cartesian2(5, 6);
        var expected = new Cartesian2(17, 39);
        var result = new Cartesian2();
        var returnedResult = left.multiplyByVector(right, result);
        expect(returnedResult).toBe(result);
        expect(result).toEqual(expected);
    }