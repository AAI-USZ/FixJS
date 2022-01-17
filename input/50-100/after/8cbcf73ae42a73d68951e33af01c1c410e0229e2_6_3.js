function() {
        var left = new Cartesian2(2, 3);
        var right = new Cartesian2(4, 5);
        var expectedResult = new Cartesian2(6, 8);
        var result = left.add(right);
        expect(result).toEqual(expectedResult);
    }