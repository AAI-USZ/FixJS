function(datePicker, date) {
            if (datePicker.getValue() == null || date == null) {
                ok(datePicker.getValue() == null && date == null);
                equal(datePicker.monthView.$node.find('td.selected').length, 0);
                equal(datePicker.$node.find('input[type=text]').val(), '');
                return;
            }
            equal(datePicker.getValue(), date.format('YYYY-MM-DD'));
            datePicker.monthView.$node.find('td').each(function(i, el) {
                if ((new RegExp(date.date().toString())).test($(el).text())) {
                    ok($(el).hasClass('selected'));
                } else {
                    ok(!$(el).hasClass('selected'));
                }
            });
            equal(datePicker.$node.find('input[type=text]').val(),
                    date.format('YYYY-MM-DD'));
        }