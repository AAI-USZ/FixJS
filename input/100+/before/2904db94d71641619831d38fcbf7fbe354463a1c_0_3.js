function() {
        var toFind = new LeapSecond(this, 0.0);
        var leapSeconds = LeapSecond.leapSeconds;
        var index = binarySearch(leapSeconds, toFind, LeapSecond.compareLeapSecondDate);
        if (index < 0) {
            index = ~index;
            --index;
            if (index < 0) {
                return 10.0;
            }
        }

        var lastDate = leapSeconds[index].julianDate;
        var taiCutoff = lastDate.addSeconds(leapSeconds[index].offset);
        if (this.lessThan(taiCutoff)) {
            --index;
        }

        if (index < 0) {
            return 10.0;
        }

        return leapSeconds[index].offset;
    }