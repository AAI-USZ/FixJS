function (entry) {
            var id = getRegistrationId(entry.registrationId);
            var division = self.registrations[id].divisionId();
            self.divisionPanels[division] = self.divisionPanels[division] || ko.observable(entry.panel);
        }