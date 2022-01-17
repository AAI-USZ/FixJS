function() {
        var matrix = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        var expected = new Cartesian3(4, 8, 12);
        var returnedResult = matrix.getTranslation();
        expect(expected).toEqual(returnedResult);
    }