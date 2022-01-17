function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);

        dp.monthView.$node.find('td:contains(14)').trigger('click');
        dateIsSelected(dp, moment('2012-07-14'));

        dp.monthView.$node.find('td:contains(28)').trigger('click');
        dateIsSelected(dp, moment('2012-07-28'));

    }