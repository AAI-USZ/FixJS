function() {
        var right = new Cartesian3(4, 3, 6);
        expect(function() {
            Cartesian3.cross(undefined, right);
        }).toThrow();
    }