function (value) {
                if (typeof (value) == 'string') {
                    value = value.replace(this.ignoreInDateParse, '');
                    value = $.datepicker.parseDate(this.dateFormat, value);
                }

                this.$editor.datepicker("setDate", value);
            }