function() {
        var left = new Cartesian3(2.0, 3.0, 4.0);
        var right = new Cartesian3(1.0, 5.0, 7.0);
        var expectedResult = new Cartesian3(1.0, -2.0, -3.0);
        var result = left.subtract(right);
        expect(result).toEqual(expectedResult);
    }