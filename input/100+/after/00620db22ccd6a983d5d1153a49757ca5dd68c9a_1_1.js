function () {
                var date = this.$editor.datepicker("getDate");

                return $.datepicker.formatDate(this.dateFormat, date);
            }