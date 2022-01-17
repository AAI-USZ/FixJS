function (value) {
        var dateValue = this.convertToDate(value),
            output = dateValue.getUTCFullYear() + '-' +
                pad(dateValue.getUTCMonth() + 1) + '-' +
                pad(dateValue.getUTCDate()) + 'T' +
                pad(dateValue.getUTCHours()) + ':' +
                pad(dateValue.getUTCMinutes()) + ':' +
                pad(dateValue.getUTCSeconds()) +
                this.getReadableTimezone(dateValue, true);

        return output;
    }