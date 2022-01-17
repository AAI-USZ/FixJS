function(a, b) {
        var dayDifference = (a._julianDayNumber - b._julianDayNumber);
        if (dayDifference !== 0) {
            return dayDifference;
        }
        return a._secondsOfDay - b._secondsOfDay;
    }