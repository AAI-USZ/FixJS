function() {
        var left = new Cartesian2(2.0, 3.0);
        var right = new Cartesian2(4.0, 5.0);
        var expectedResult = 23.0;
        var result = left.dot(right);
        expect(result).toEqual(expectedResult);
    }