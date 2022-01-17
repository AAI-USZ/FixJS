function () {
        self.post.competitionName('');
        //        self.post.description('');
        self.post.firstDay($.datepicker.formatDate('mm/dd/yy', new Date()));
        //        self.post.lastDay($.datepicker.formatDate('mm/dd/yy', new Date()));
        self.post.numberOfDays(1);
        self.post.competitionStyle(1);
        self.post.numberOfPanels(2);

        self.post.numberOfPerformances = ko.computed(function () {
            if (self.post.competitionStyle() == 2) {
                return 2;
            } else {
                return 1;
            }
        });

        self.post.isWorldsCompetition = ko.computed(function () {
            return self.post.competitionStyle() == 3;
        });

        self.post.panels = ko.computed(function () {
            return _.map(_.range(self.post.numberOfPanels()), function (i) {
                return String.fromCharCode(65 + i);
            });
        });

        form.find('.validation-summary-errors').empty();
    }