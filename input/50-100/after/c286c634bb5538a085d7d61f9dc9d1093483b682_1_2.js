function() {
        var expectedDate = new Date('7/1/1997 12:00:00 AM UTC');
        var date = new JulianDate(2450630, 43230.0, TimeStandard.TAI).toDate();
        expect(date).toEqual(expectedDate);
    }