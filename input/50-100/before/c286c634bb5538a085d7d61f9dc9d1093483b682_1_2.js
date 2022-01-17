function() {
        var start = JulianDate.fromDate(new Date('July 4, 2011 12:00:00 UTC'));
        var end = JulianDate.fromDate(new Date('July 5, 2011 12:01:00 UTC'));
        expect(start.getSecondsDifference(end)).toEqualEpsilon(TimeConstants.SECONDS_PER_DAY + TimeConstants.SECONDS_PER_MINUTE, CesiumMath.EPSILON5);
    }