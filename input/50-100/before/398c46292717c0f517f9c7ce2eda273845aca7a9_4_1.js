function (dateObj, addDelimiter) {
        dateObj = dateObj || new Date();
        addDelimiter = addDelimiter || false;

        var offset = -dateObj.getTimezoneOffset(),
            hours = Math.floor(offset / 60),
            minutes = (offset - (hours * 60)),
            output = ((hours > 0) ? '+' : '-') +
                pad(hours) +
                (addDelimiter ? ':' : '') +
                pad(minutes);

        return output;
    }