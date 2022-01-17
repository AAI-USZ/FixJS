function (divisionId) {
        var result =
            self.schedule.divisionPanels[divisionId] ?
            self.schedule.divisionPanels[divisionId] :
            self.schedule.divisionPanels[divisionId] = ko.observable(self.panels()[0]);

        return result;
    }