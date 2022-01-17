function (value) {
        var dateValue = convertToDate(value),
            output = dayName(dateValue, true) + ', ' +
                dateValue.getDate() + ' ' +
                monthName(dateValue, true) + ' ' +
                dateValue.getUTCFullYear() + ' ' +
                pad(dateValue.getUTCHours()) + ':' +
                pad(dateValue.getUTCMinutes()) + ':' +
                pad(dateValue.getUTCSeconds()) + ' ' +
                offset(dateValue);

        return output;
    }