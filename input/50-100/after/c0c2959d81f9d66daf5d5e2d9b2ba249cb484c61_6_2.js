function() {
        var start = new Cartesian2(4.0, 8.0);
        var end = new Cartesian2(8.0, 20.0);
        var t = 0.25;
        var expectedResult = new Cartesian2(5.0, 11.0);
        var result = start.lerp(end, t);
        expect(result).toEqual(expectedResult);
    }