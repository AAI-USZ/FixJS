function() {
        var date = new JulianDate(2454832, 43233, TimeStandard.TAI).toDate();
        expect(date).toEqual(new Date('1/1/2009 12:00:00 AM UTC'));
    }