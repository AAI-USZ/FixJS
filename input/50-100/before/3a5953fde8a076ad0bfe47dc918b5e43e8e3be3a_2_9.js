function() {
        var left = Matrix2.fromComponents(1, 2, 3, 4);
        var right = new Cartesian2(5, 6);
        var expected = new Cartesian2(17, 39);
        var result = left.multiplyByVector(right);
        expect(result).toEqual(expected);
    }