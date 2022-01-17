function() {
        var cartesian = new Cartesian2(2.0, 0.0);
        var expectedResult = new Cartesian2(1.0, 0.0);
        var result = cartesian.normalize();
        expect(result).toEqual(expectedResult);
    }