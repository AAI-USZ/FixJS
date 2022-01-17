function() {
        var leapSeconds = LeapSecond.leapSeconds;
        var toFind = new LeapSecond(JulianDate.fromDate(new Date('January 1, 1973 00:00:00 UTC')), 12.0);
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        expect(LeapSecond.leapSeconds[index].offset).toEqual(12.0);
    }