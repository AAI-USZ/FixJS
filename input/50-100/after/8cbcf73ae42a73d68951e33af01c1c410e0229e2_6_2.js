function() {
        var left = new Cartesian2(2, 3);
        var right = new Cartesian2(4, 5);
        var expectedResult = 23;
        var result = left.dot(right);
        expect(result).toEqual(expectedResult);
    }