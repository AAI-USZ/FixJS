function() {
        var leapSeconds = LeapSecond.leapSeconds;
        var toFind = new LeapSecond(JulianDate.fromDate(new Date('July 1, 1972 00:00:00 UTC')), 0.0);
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        expect(leapSeconds[index].julianDate).toEqual(toFind.julianDate);
    }