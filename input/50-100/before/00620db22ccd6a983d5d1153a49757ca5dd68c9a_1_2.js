function (value) {
                if (value != null && typeof (value) != 'undefined') {
                    value = value.substring(0, 10);
                }

                this.$editor.datepicker("setDate", value);
            }