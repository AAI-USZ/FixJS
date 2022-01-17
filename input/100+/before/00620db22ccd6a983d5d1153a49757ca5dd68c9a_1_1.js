function () {
                var date = this.$editor.datepicker("getDate");
                var noTimezoneDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

                var month = noTimezoneDate.getMonth() + 1;
                if (month < 10) month = "0" + month;

                var day = date.getDate().toString();
                if (day.length == 1) day = "0" + day;

                return (date.getFullYear() + "-" + month + "-" + day);
            }