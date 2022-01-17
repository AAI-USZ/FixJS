function() {
        var left = new Cartesian4(2.0, 3.0, 6.0, 8.0);
        var right = new Cartesian4(4.0, 5.0, 7.0, 9.0);
        var expectedResult = new Cartesian4(8.0, 15.0, 42.0, 72.0);
        var returnedResult = left.multiplyComponents(right, left);
        expect(left === returnedResult).toEqual(true);
        expect(left).toEqual(expectedResult);
    }