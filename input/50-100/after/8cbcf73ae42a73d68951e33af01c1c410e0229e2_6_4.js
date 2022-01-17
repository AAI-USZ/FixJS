function() {
        var left = new Cartesian2(2, 3);
        var right = new Cartesian2(4, 5);
        var result = new Cartesian2();
        var expectedResult = new Cartesian2(6, 8);
        var returnedResult = left.add(right, result);
        expect(returnedResult === result);
        expect(result).toEqual(expectedResult);
    }