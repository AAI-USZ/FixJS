function convertTaiToUtc(julianDate, result) {
        var toFind = new LeapSecond(julianDate, 0.0);
        var leapSeconds = LeapSecond.leapSeconds;
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        if (index < 0) {
            index = ~index;
            --index;
        }
        var leapSecond;
        // now we have the index of the most recent leap second that is after the requested date.
        if (index >= 0) {
            leapSecond = leapSeconds[index];
            var mostRecentOffset = leapSecond.offset;
            var leapSecondDate = leapSecond.julianDate;

            if (julianDate.getJulianDayNumber() === leapSecondDate.getJulianDayNumber()) {
                // if the requested date is on the day of the leap second, we may have to adjust
                var secondsSinceLeapSecond = julianDate.getSecondsOfDay() - leapSecondDate.getSecondsOfDay();
                if (secondsSinceLeapSecond >= mostRecentOffset - 1 && secondsSinceLeapSecond < mostRecentOffset) {
                    // if the requested date is during the moment of a leap second, then we cannot convert to UTC
                    return undefined;
                }

                if (secondsSinceLeapSecond < mostRecentOffset) {
                    // The leap second we found is actually after the desired date, as a result of simply treating
                    // the TAI date as if it were UTC. So, use the previous leap second instead.
                    --index;
                }
            }
            julianDate.addSeconds(-leapSeconds[index].offset, result);
        } else {
            julianDate.addSeconds(-leapSeconds[0].offset, result);
        }
        return result;
    }