function() {
        var left = new Cartesian4(2.0, 3.0, 6.0, 8.0);
        var right = new Cartesian4(4.0, 5.0, 7.0, 9.0);
        var expectedResult = 137.0;
        var result = left.dot(right);
        expect(result).toEqual(expectedResult);
    }