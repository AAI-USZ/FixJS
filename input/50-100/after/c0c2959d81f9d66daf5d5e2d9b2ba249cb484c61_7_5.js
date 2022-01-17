function() {
        var left = new Cartesian3(2.0, 3.0, 6.0);
        var right = new Cartesian3(4.0, 5.0, 7.0);
        var expectedResult = new Cartesian3(8.0, 15.0, 42.0);
        var result = left.multiplyComponents(right);
        expect(result).toEqual(expectedResult);
    }