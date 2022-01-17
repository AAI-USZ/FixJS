function() {
        var expected = new Matrix2([1.0, 2.0, 3.0, 4.0]);
        var result = new Matrix2();
        var returnedResult = expected.clone(result);
        expect(returnedResult).toBe(result);
        expect(returnedResult).toNotBe(expected);
        expect(returnedResult).toEqual(expected);
    }