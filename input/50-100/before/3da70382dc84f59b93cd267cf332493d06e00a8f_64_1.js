function() {
        var property = new DynamicPositionProperty();
        property.processCzmlIntervals(cartesianInterval);

        var cartographic = Ellipsoid.WGS84.toCartographic3(property.getValueCartesian(epoch));
        var result = property.getValueCartographic(epoch);
        expect(result.longitude).toEqual(cartographic.longitude);
        expect(result.latitude).toEqual(cartographic.latitude);
        expect(result.height).toEqual(cartographic.height);
    }