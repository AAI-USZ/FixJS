function () {
        if (!self.registration())
            return '';

        return viewModel.schedule.divisionPanels[self.registration().divisionId];
    }