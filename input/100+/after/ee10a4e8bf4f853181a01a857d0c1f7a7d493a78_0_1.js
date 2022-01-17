function (timestamp) {
        /* the result value differs from Date.toISOString() because if uses
           " " as a date/time separator (instead of "T") and because it stops
           at the seconds (and not at milliseconds) */
        return self.format_iso_date(timestamp) + " " + self.format_time(timestamp);
    }