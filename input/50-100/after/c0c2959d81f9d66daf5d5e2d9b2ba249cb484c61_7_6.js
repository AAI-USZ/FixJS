function() {
        var left = new Cartesian3(2.0, 3.0, 6.0);
        var right = new Cartesian3(4.0, 5.0, 7.0);
        var expectedResult = 65.0;
        var result = left.dot(right);
        expect(result).toEqual(expectedResult);
    }