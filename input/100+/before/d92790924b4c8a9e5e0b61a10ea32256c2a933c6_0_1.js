function (value) {
                // date in format: yyyy-mm-dd
                // indexes:        0123 56 89
                var year = value.substring(0, 4);
                var month = value.substring(5, 7) - 1; //months go from 0 to 11, wtf javascript
                var day = value.substring(8, 10);
                var dateValue = new Date(year, month, day, 0, 0, 0, 0);
                return Globalize.format(dateValue, "d");
            }