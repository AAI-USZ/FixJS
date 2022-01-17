function (divisionId) {

        var result =
            self.divisionPanels[divisionId] ?
                self.divisionPanels[divisionId] :
                self.divisionPanels[divisionId] = ko.observable(self.panels()[0]);

        return result;
    }