function(a, b) {
        // If the days aren't even close, don't bother thinking about the time standard.
        var dayDifference = (a._julianDayNumber - b._julianDayNumber) | 0;
        if (dayDifference > 1 || dayDifference < -1) {
            return dayDifference;
        }
        //Recompute dayDifference after changing time standards.
        dayDifference = (a._julianDayNumber - b._julianDayNumber);
        if (dayDifference !== 0) {
            return dayDifference;
        }

        return a._secondsOfDay - b._secondsOfDay;
    }