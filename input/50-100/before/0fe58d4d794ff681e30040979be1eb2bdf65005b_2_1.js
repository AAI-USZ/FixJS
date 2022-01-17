function (value) {
        var dateValue = this.convertToDate(value),
            output = this.getDayShort(dateValue) + ', ' +
                dateValue.getDate() + ' ' +
                this.getMonthShort(dateValue) + ' ' +
                dateValue.getUTCFullYear() + ' ' +
                pad(dateValue.getUTCHours()) + ':' +
                pad(dateValue.getUTCMinutes()) + ':' +
                pad(dateValue.getUTCSeconds()) + ' ' +
                this.getReadableTimezone(dateValue);

        return output;
    }