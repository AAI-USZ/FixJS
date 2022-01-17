function (value) {
        var dateValue = this.convertToDate(value),
            output = (dateValue.getTime() - dateValue.getMilliseconds()) / 1000;

        return output;
    }