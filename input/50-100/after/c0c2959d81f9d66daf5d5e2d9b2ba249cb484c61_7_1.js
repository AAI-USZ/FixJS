function() {
        var cartesian = new Cartesian3(1.0, 2.0, 3.0);
        expect(cartesian.x).toEqual(1.0);
        expect(cartesian.y).toEqual(2.0);
        expect(cartesian.z).toEqual(3.0);
    }