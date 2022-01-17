function() {
        var property = new DynamicPositionProperty();
        property.processCzmlIntervals(cartographicInterval);

        var cartesian = Ellipsoid.WGS84.toCartesian(property.getValueCartographic(epoch));
        var result = property.getValueCartesian(epoch);
        expect(result.x).toEqual(cartesian.x);
        expect(result.y).toEqual(cartesian.y);
        expect(result.z).toEqual(cartesian.z);
    }