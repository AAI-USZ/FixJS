function() {
        var left = new Cartesian2(2.0, 3.0);
        var right = new Cartesian2(4.0, 5.0);
        var expectedResult = new Cartesian2(8.0, 15.0);
        var result = left.multiplyComponents(right);
        expect(result).toEqual(expectedResult);
    }