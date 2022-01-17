function() {
        //Attempt to convert to UTC; if we are on a leap second, this will
        //return undefined.  Since JavaScript Date doesn't support leap second
        //we can just add second and re-convert.
        var julianDateTai = convertTaiToUtc(this, toDateScratch);
        if (typeof julianDateTai === 'undefined') {
            toDateScratch = this.addSeconds(1, toDateScratch);
            julianDateTai = convertTaiToUtc(toDateScratch, toDateScratch);
        }

        var julianDayNumber = julianDateTai._julianDayNumber;
        var secondsOfDay = julianDateTai._secondsOfDay;

        if (secondsOfDay >= 43200.0) {
            julianDayNumber += 1;
        }

        // Algorithm from page 604 of the Explanatory Supplement to the
        // Astronomical Almanac (Seidelmann 1992).
        var L = (julianDayNumber + 68569) | 0;
        var N = (4 * L / 146097) | 0;
        L = (L - (((146097 * N + 3) / 4) | 0)) | 0;
        var I = ((4000 * (L + 1)) / 1461001) | 0;
        L = (L - (((1461 * I) / 4) | 0) + 31) | 0;
        var J = ((80 * L) / 2447) | 0;
        var day = (L - (((2447 * J) / 80) | 0)) | 0;
        L = (J / 11) | 0;
        var month = (J + 2 - 12 * L) | 0;
        var year = (100 * (N - 49) + I + L) | 0;

        month--; // month field is zero-indexed

        var hours = (secondsOfDay / TimeConstants.SECONDS_PER_HOUR) | 0;
        var remainingSeconds = secondsOfDay - (hours * TimeConstants.SECONDS_PER_HOUR);
        var minutes = (remainingSeconds / TimeConstants.SECONDS_PER_MINUTE) | 0;
        remainingSeconds = remainingSeconds - (minutes * TimeConstants.SECONDS_PER_MINUTE);
        var seconds = remainingSeconds | 0;
        var milliseconds = ((remainingSeconds - seconds) / TimeConstants.SECONDS_PER_MILLISECOND) | 0;

        // JulianDates are noon-based
        hours += 12;
        if (hours > 23) {
            hours -= 24;
        }

        return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
    }