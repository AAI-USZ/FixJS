function() {
        var end = new Cartesian2(8.0, 20.0);
        var t = 0.25;
        expect(function() {
            Cartesian2.lerp(undefined, end, t);
        }).toThrow();
    }