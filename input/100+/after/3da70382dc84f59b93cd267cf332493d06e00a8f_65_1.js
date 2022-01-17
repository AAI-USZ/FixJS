function() {
        var property = new DynamicVertexPositionsProperty();
        property.processCzmlIntervals(cartographicDegreesInterval);
        var result = property.getValueCartesian(new JulianDate());

        var expected = Ellipsoid.WGS84.cartographicArrayToCartesianArray(property.getValueCartographic(new JulianDate()));

        expect(result.length).toEqual(3);
        expect(result[0].x).toEqual(expected[0].x);
        expect(result[0].y).toEqual(expected[0].y);
        expect(result[0].z).toEqual(expected[0].z);

        expect(result[1].x).toEqual(expected[1].x);
        expect(result[1].y).toEqual(expected[1].y);
        expect(result[1].z).toEqual(expected[1].z);

        expect(result[2].x).toEqual(expected[2].x);
        expect(result[2].y).toEqual(expected[2].y);
        expect(result[2].z).toEqual(expected[2].z);
    }