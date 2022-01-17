function() {
        var taiDate = new Date('September 1, 2011 12:00:00');
        var taiJulianDate = JulianDate.fromDate(taiDate, TimeStandard.TAI);

        var utcDate = new Date('September 1, 2011 11:59:26');
        var utcJulianDate = JulianDate.fromDate(utcDate, TimeStandard.UTC);

        expect(taiJulianDate.equalsEpsilon(utcJulianDate, CesiumMath.EPSILON20)).toEqual(true);
    }