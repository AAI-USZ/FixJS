function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('2012-07-12')
            .trigger($.Event('keydown', {which: 9}));
        dateIsSelected(dp, moment('2012-07-12'));

        openDatePicker(dp);
        dp.$node.find('input[type=text]').val('2012-07-28')
            .trigger($.Event('keydown', {which: 13}));
        dateIsSelected(dp, moment('2012-07-28'));
    }