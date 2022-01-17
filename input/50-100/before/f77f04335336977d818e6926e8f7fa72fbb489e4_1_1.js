function(datePicker, date) {
            var dfd = $.Deferred();
            date = _.isString(date)? moment(date) : date;
            datePicker.$node
                .find('td:contains('+date.date()+')').trigger('click').end()
                .find('input[type=text]').trigger('blur');
            setTimeout(function() {dfd.resolve();}, 0);
            return dfd;
        }