function() {
        var right = new Cartesian2(4.0, 5.0);
        expect(function() {
            Cartesian2.multiplyComponents(undefined, right);
        }).toThrow();
    }