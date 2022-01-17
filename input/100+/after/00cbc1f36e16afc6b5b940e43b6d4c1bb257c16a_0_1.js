function (data) {
    data.time = new Date(data.time);
    ko.mapping.fromJS(data, {}, this);

    var self = this;
    self.registration = ko.computed(function () {
        if (!this.registrationId)
            return undefined;

        var id = getRegistrationId(this.registrationId());
        return window.viewModel ? window.viewModel.registrations[id] : {};
    }, self);

    self.isRegistration = ko.computed(function () {
        return self.registration();
    }, self);

    self.isNonTeamEntry = ko.computed(function () {
        return !self.isRegistration();
    }, self);

    self.originalPanel = data.panel;
    
    self.panel = ko.computed(function () {
        return self.registration() && window.viewModel ? viewModel.getPanel(self.registration().divisionId())() : '';
    }, self);
}