function() {
        var expectedDate = new Date('6/30/1997 11:59:59 PM UTC');
        var date = new JulianDate(2450630, 43229.0, TimeStandard.TAI).toDate();
        expect(date).toEqual(expectedDate);
    }