function convertTaiToUtc(julianDate, result) {
        var toFind = new LeapSecond(julianDate, 0.0);
        var leapSeconds = LeapSecond.leapSeconds;
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        if (index < 0) {
            index = ~index;
        }

        //All times before our first leap second get the first offset.
        if (index === 0) {
            return julianDate.addSeconds(-leapSeconds[0].offset, result);
        }

        //All times after our leap second get the last offset.
        if (index >= leapSeconds.length) {
            return julianDate.addSeconds(-leapSeconds[index - 1].offset, result);
        }

        var leapSecond = leapSeconds[index];
        var leapSecondDate = leapSecond.julianDate;
        var difference = julianDate.getSecondsDifference(leapSecondDate);

        //The date is in our leap second table, so just use it..
        if (difference === 0) {
            return julianDate.addSeconds(-leapSeconds[index].offset, result);
        }

        //Otherwise if the requested date is during the moment of a leap second, then we cannot convert to UTC
        if (difference <= 1.0) {
            return undefined;
        }

        //Index is the first leap second after the date we're converting, but what we need the index before..
        return julianDate.addSeconds(-leapSeconds[--index].offset, result);
    }