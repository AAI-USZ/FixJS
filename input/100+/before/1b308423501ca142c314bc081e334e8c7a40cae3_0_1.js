function ( isoDate ) {
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
    }