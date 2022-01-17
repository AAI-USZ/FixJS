function() {

    var MS_IN_DAY = 86400000,
        // Set the starting day of the week.
        // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        WEEK_START = 1;
    
    // Check if date falls between two other dates
    Date.prototype.isBetween = function ( startDate, endDate ) {
        return (this >= startDate && this < endDate);
    };
    
    // Returns true if the given Date falls within the current calendar week.
    Date.prototype.isThisWeek = function () {
        return this.getWeek() === new Date().getWeek();
    };
    
    // Returns true if the given Date falls within the current calendar day.
    Date.prototype.isToday = function () {
        return (this >= Date.startOfToday() && this <= Date.endOfToday());
    };
    
    // Returns a Date representing the start of the calendar week in which the given date resides.
    Date.prototype.startOfWeek = function () {
        return new Date(this.getTime() - MS_IN_DAY * (this.getDay() - WEEK_START)).startOfDay();
    };
    
    // Returns a Date representing the end of the calendar week in which the given date resides.
    Date.prototype.endOfWeek = function () {
        return new Date(this.getTime() + MS_IN_DAY * (this.getDay() - WEEK_START)).endOfDay();
    };

    // Returns a Date representing the end of the current calendar week.
    Date.endOfThisWeek = function () {
        return new Date().endOfWeek();
    };

    // Returns a Date representing the beginning of the current calendar week.
    Date.startOfThisWeek = function () {
        return new Date().startOfWeek();
    };

    // Returns a Date representing the start of the day in which the given Date resides.
    Date.prototype.startOfDay = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
    };

    // Returns a Date representing the end of the day in which the given Date resides.
    Date.prototype.endOfDay = function () {
        var tomorrow = new Date(this.getTime() + MS_IN_DAY);

        return new Date(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0).getTime() - 1);
    };
    
    // Returns a Date representing the start of the current day.
    Date.startOfToday = function () {
        return new Date().startOfDay();
    };
    
    // Returns a Date representing the end of the current day.
    Date.endOfToday = function () {
        return new Date().endOfDay();
    };

    // Returns a Date representing the start of the current year.
    Date.startOfYear = function () {
        return new Date(new Date().getFullYear().toString());
    };

    // Returns a Date representing the end of the current year.
    Date.endOfYear = function () {
        return new Date(new Date((Date.startOfYear().getFullYear() + 1).toString()).getTime()-1);
    };

    // Returns the week number of the week, from 1-52, for the given date.
    Date.prototype.getWeek = function () {
        return Math.ceil((((this - Date.startOfYear()) / MS_IN_DAY) + Date.startOfYear().getDay() - 1 + WEEK_START) / 7);
    };

    // Based on Paul Sowden's ISO8601 date parser
    // http://delete.me.uk/2005/03/iso8601.html
    // This improved version will take a datetime in any timezone and produce it in the system timezone
    // It is also more flexible with input format, accepting both separate and combined datetime,
    // as well as a few different styles for formatting the timezone identifier.
    // More info: http://en.wikipedia.org/wiki/ISO_8601
    // Tested formats:
    // 2010-06-23
    // 2010-06-23 13:37:00
    // 2010-06-23T13:37:00Z
    // 2010-06-23T13:37:00+1000
    Date.fromISO8601 = function ( isoDate ) {
        //
        // 2010-06-17
        // 2010-06-17 05:55Z
        // 2010-06-17T05:55Z
        // 2010-W24-4 [Year, week number, day of week]
        // 2010-168 [Year, day of year]
        //
        // To do: improve this regex (maybe), to better enforce ISO8601 formatting.
        var regexp = /([0-9]{4})(-([W0-9]{1,3})(-([0-9]{1,2})([T|\s]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})((:?)([0-9]{2}))?))?)?)?)?/,
            dateParts = isoDate.match(new RegExp(regexp)),
            date = new Date(dateParts[1], 0, 1),
            offset = 0,
            time;

        if (dateParts[3] && dateParts[3].indexOf("W") === -1)
            if (dateParts[5])
                date.setMonth(dateParts[3] - 1);
            else
                return new Date((dateParts[3] - 1) * MS_IN_DAY + date.getTime());

        if (dateParts[5]) {
            if ( dateParts[3].indexOf("W") === 0 && dateParts[5]) {
                return new Date(date.getTime() + (dateParts[3].substr(1, dateParts[3].length - 1) - 1) * 7 * MS_IN_DAY + (dateParts[5] - 1) * MS_IN_DAY);
            } else
                date.setDate(dateParts[5]);
        }

        if (dateParts[7]) date.setHours(dateParts[7]);
        if (dateParts[8]) date.setMinutes(dateParts[8]);
        if (dateParts[10]) date.setSeconds(dateParts[10]);
        if (dateParts[12]) date.setMilliseconds(Number("0." + dateParts[12]) * 1000);
        if (dateParts[14]) offset = ((Number(dateParts[16]) * 60) + ((typeof dateParts[19] !== "undefined") ? Number(dateParts[19]) : 0)) * ((dateParts[15] === "-") ? 1 : -1);

        offset -= date.getTimezoneOffset();
        time = (Number(date) + (offset * 60 * 1000));

        date.setTime(Number(time));

        return date;
    };

    // Use if you need to get timezone based on a nautical identifier
    // i.e. K (Kilo time) is the identifier for +1000 (i.e. AEST)
    Date.timezoneFromNauticalDesignator = function ( phonetic ) {
        var code = phonetic.toUpperCase().charCodeAt(0);

        // Zulu (also catches Juliet time, which is unassigned)
        if ( code === 90 || code === 74 )
            return 0;
        // Alpha (+1) to India (+9)
        if ( code >= 65 && code <= 73 )
            return (code - 64);
        // Kilo (+10) to Mike (+12)
        if ( code >= 75 && code <= 77 )
            return (code - 65);
        // November (-1) to Yankee (-12)
        if ( code >= 78 && code <= 89 )
            return (0 - (code-77));    
    };

}