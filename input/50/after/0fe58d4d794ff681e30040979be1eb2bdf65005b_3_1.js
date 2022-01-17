function (value) {
        var dateValue = convertToDate(value),
            output = (dateValue.getTime() - dateValue.getMilliseconds()) / 1000;

        return output;
    }