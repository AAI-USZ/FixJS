function() {
        var cartesian = new Cartesian3(2.0, 0.0, 0.0);
        var expectedResult = new Cartesian3(1.0, 0.0, 0.0);
        var result = cartesian.normalize();
        expect(result).toEqual(expectedResult);
    }