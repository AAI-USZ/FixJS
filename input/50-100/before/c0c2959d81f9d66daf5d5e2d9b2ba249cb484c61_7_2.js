function() {
        var c = new Cartesian3(1, 0, 0).cross(new Cartesian3(0, 1, 0));
        expect(c.equals(new Cartesian3(0, 0, 1))).toEqual(true);
    }