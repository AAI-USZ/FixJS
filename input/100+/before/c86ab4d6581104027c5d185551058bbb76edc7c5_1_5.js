function($, _, moment, DatePicker) {

    test('DatePicker.numDaysInMonth', function() {
        _.each([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], function(days, i) {
            equal(DatePicker.numDaysInMonth(moment((i+1).toString(), 'M')), days);
        });
        equal(DatePicker.numDaysInMonth(moment('2000 2', 'YYYY MM')), 29);
    });

    module('mothview');

    test('instantiation', function() {
        ok(DatePicker.MonthView());
    });

    test('monthview date placement 1', function() {
        var m = DatePicker.MonthView(undefined, {date: moment('2012-07-13')});
        equal(m.$node.find('tr:first td:eq(0)').text().trim(), '1');
        equal(m.$node.find('tr:last td:eq(2)').text().trim(), '31');
        equal(m.$node.find('tr:last td:eq(3)').text().trim(), '');
        equal(m.$node.find('tr:last td:eq(4)').text().trim(), '');
        equal(m.$node.find('tr:last td:eq(5)').text().trim(), '');
        equal(m.$node.find('tr:last td:eq(6)').text().trim(), '');
    });

    test('monthview date placement 2', function() {
        var m = DatePicker.MonthView(undefined, {date: moment('2012-06-02')});
        equal(m.$node.find('tr:first td:eq(0)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(1)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(2)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(3)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(4)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(5)').text().trim(), '1');
        equal(m.$node.find('tr:last td:last').text().trim(), '30');
    });

    test('monthview date placement 3', function() {
        var m = DatePicker.MonthView(undefined, {date: moment('2012-05-02')});
        equal(m.$node.find('tr:first td:eq(0)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(1)').text().trim(), '');
        equal(m.$node.find('tr:first td:eq(2)').text().trim(), '1');
        equal(m.$node.find('tr:last td:eq(4)').text().trim(), '31');
        equal(m.$node.find('tr:last td:eq(5)').text().trim(), '');
    });

    test('current date class', function() {
        var m = DatePicker.MonthView(undefined, {date: moment('2012-07-13')});
        ok(m.$node.find('tr:eq(1) td:eq(5)').hasClass('current'));
    });

    module('datepicker');

    var openDatePicker = function(datePicker) {
            datePicker.$node.find('input').trigger('focus');
        },
        dateIsSelected = function(datePicker, date) {
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
        };

    test('instantiation', function() {
        // var $node = $('<div>').appendTo('#qunit-fixture');
        // ok(DatePicker($node));
        var $node = $('<div>').appendTo('body');
        ok(DatePicker($node).menu.show());
        ok(DatePicker().appendTo('#qunit-fixture'));
    });

    test('clicking input box opens the datepicker', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);
        ok(dp.menu.isShown());
    });

    test('clicking right arrow advances the month', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);
        dp.menu.$node.find('h4 .right').trigger('click');
        equal(dp.options.date.format('YYYY-MM-DD'), '2012-08-13');
    });

    test('clicking left arrow retreats the month', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);
        dp.menu.$node.find('h4 .left').trigger('click');
        equal(dp.options.date.format('YYYY-MM-DD'), '2012-06-13');
    });

    test('clicking a day sets the selected date', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);

        dp.monthView.$node.find('td:contains(14)').trigger('click');
        dateIsSelected(dp, moment('2012-07-14'));

        dp.monthView.$node.find('td:contains(28)').trigger('click');
        dateIsSelected(dp, moment('2012-07-28'));

    });

    module('datepicker input');

    test('setting value in the input sets value', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('2012-07-12').trigger('blur');
        dateIsSelected(dp, moment('2012-07-12'));

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('2012-07-28')
            .trigger($.Event('keyup', {which: 13}));
        dateIsSelected(dp, moment('2012-07-28'));
    });

    test('invalid value in the input is reset', function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('asdfasdf').trigger('blur');
        dateIsSelected(dp, null);

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('2012-07-12').trigger('blur');
        dateIsSelected(dp, moment('2012-07-12'));

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('asdfasdf')
            .trigger($.Event('keyup', {which: 13}));
        dateIsSelected(dp, moment('2012-07-12'));
    });

    start();
}