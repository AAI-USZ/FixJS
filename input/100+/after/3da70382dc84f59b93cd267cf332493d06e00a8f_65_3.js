function() {
        var property = new DynamicVertexPositionsProperty();
        property.processCzmlIntervals(cartesianInterval);
        var result = property.getValueCartographic(new JulianDate());

        var expected = Ellipsoid.WGS84.cartesianArrayToCartographicArray(property.getValueCartesian(new JulianDate()));

        expect(result.length).toEqual(3);
        expect(result[0].longitude).toEqual(expected[0].longitude);
        expect(result[0].latitude).toEqual(expected[0].latitude);
        expect(result[0].height).toEqual(expected[0].height);

        expect(result[1].longitude).toEqual(expected[1].longitude);
        expect(result[1].latitude).toEqual(expected[1].latitude);
        expect(result[1].height).toEqual(expected[1].height);

        expect(result[2].longitude).toEqual(expected[2].longitude);
        expect(result[2].latitude).toEqual(expected[2].latitude);
        expect(result[2].height).toEqual(expected[2].height);
    }