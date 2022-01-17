function (value) {
                value = value.replace(this.ignoreInDateParse, '');
                var dateValue = $.datepicker.parseDate(this.dateFormat, value);
                return $.datepicker.formatDate(this.uiDateFormat, dateValue);
            }