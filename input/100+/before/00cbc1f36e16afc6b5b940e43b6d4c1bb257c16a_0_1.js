function () {
        return self.registration() && window.viewModel ? viewModel.getPanel(self.registration().divisionId())() : '';
    }