function() {
        var dp = DatePicker(undefined, {date: moment('2012-07-13')});
        openDatePicker(dp);

        clickOnDate(dp, '2012-07-14').done(function() {
            dateIsSelected(dp, moment('2012-07-14'));

            clickOnDate(dp, '2012-07-28').done(function() {
                dateIsSelected(dp, moment('2012-07-28'));
                start();
            });
        });
    }