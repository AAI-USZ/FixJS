function() {
        var taiDate = new Date('September 1, 2012 12:00:35');
        var taiJulianDate = JulianDate.fromDate(taiDate, TimeStandard.TAI);

        var utcDate = new Date('September 1, 2012 12:00:00');
        var utcJulianDate = JulianDate.fromDate(utcDate, TimeStandard.UTC);

        expect(taiJulianDate.equalsEpsilon(utcJulianDate, CesiumMath.EPSILON20)).toEqual(true);
    }