function() {
        var left = new Cartesian2(2, 3);
        var right = new Cartesian2(1, 5);
        var expectedResult = new Cartesian2(1, -2);
        var result = left.subtract(right);
        expect(result).toEqual(expectedResult);
    }