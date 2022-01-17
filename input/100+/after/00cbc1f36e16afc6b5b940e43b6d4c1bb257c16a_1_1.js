function (data) {
    var self = this;

    data.time = new Date(data.time);
    ko.mapping.fromJS(data, {}, self);

    self.registration = ko.computed(function () {
        if (!this.registrationId)
            return undefined;

        var id = getRegistrationId(this.registrationId());
        return viewModel.registrations[id];
    }, self);

//    self.panel = ko.computed(function () {
//        if (!self.registration())
//            return '';
//
//        return 'a'; viewModel.schedule.divisionPanels[self.registration().divisionId];
//    }, self);

    self.isMyPanel = function (panel) {
        return self.panel() == panel;
    };

    self.getTemplate = function (judge) {
        var division = self.registration().divisionId;
        var level = self.registration().levelId;
        var map = viewModel.scoringMap[judge] || viewModel.scoringMap[division] || viewModel.scoringMap[level];
        return map();
    };
}