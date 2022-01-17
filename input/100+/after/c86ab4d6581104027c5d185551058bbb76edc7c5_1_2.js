function(datePicker, date) {
            date = _.isString(date)? moment(date) : date;
            if (datePicker.getValue() == null || date == null) {
                ok(datePicker.getValue() == null && date == null);
                equal(datePicker.monthView.$node.find('td.selected').length, 0);
                equal(datePicker.$node.find('input[type=text]').val(), '');
                return;
            }
            equal(datePicker.getValue(), date.format('YYYY-MM-DD'));
            datePicker.monthView.$node.find('td').each(function(i, el) {
                if ((new RegExp('^' + date.date().toString() + '$')).test($(el).text().trim())) {
                    ok($(el).hasClass('selected'), [
                        'expected el to be selected,' +
                        'date: ', date.format('YYYY-MM-DD'), ', ' + 
                        'el.class:' + el.className + ', ' + 
                        'text: ' + $(el).text()].join());
                } else {
                    ok(!$(el).hasClass('selected'), [
                        'expected el NOT to be selected,' +
                        'date: ', date.format('YYYY-MM-DD'), ', ' + 
                        'el.class:' + el.className + ', ' + 
                        'text: ' + $(el).text()].join());
                }
            });
            equal(datePicker.$node.find('input[type=text]').val(),
                    date.format('YYYY-MM-DD'));
        }