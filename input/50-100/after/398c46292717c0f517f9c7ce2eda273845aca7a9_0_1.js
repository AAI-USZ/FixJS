function (value) {
        var dateValue = convertToDate(value),
            output = dateValue.getUTCFullYear() + '-' +
                pad(dateValue.getUTCMonth() + 1) + '-' +
                pad(dateValue.getUTCDate()) + 'T' +
                pad(dateValue.getUTCHours()) + ':' +
                pad(dateValue.getUTCMinutes()) + ':' +
                pad(dateValue.getUTCSeconds()) + 'Z';

        return output;
    }