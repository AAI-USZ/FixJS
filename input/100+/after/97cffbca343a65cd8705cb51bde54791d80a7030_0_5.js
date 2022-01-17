function(scenario_id, property_id) {
    var url = "/features/folder/{folder_uid}/add/{scenario_uid}";
    url = url.replace('{folder_uid}', property_id).replace('{scenario_uid}', scenario_id);
    $.ajax({
      url: url,
      type: "POST",
      success: function(data) {
        self.updateScenario(JSON.parse(data)["X-Madrona-Select"], true);
        app.scenarios.viewModel.showScenarioFormPanel(false);
        app.scenarios.viewModel.showScenarioList(true);
        app.new_features.removeAllFeatures();
      }
    });
  }