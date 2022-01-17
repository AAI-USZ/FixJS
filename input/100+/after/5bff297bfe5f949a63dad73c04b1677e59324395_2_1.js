function() {
        var expected = new Matrix4(1.0, 2.0, 3.0, 10.0, 4.0, 5.0, 6.0, 11.0, 7.0, 8.0, 9.0, 12.0, 0.0, 0.0, 0.0, 1.0);
        var returnedResult = Matrix4.fromRotationTranslation(new Matrix3(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0), new Cartesian3(10.0, 11.0, 12.0));
        expect(returnedResult).toNotBe(expected);
        expect(returnedResult).toEqual(expected);
    }