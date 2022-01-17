function(scenario_uid) {
    self.scenarioLoadComplete(false);
    self.scenarioLoadError(false);
    var url;
    if (scenario_uid) {
        // TODO  get url from workspace
        url = '/features/generic-links/links/geojson/' + scenario_uid + '/';

        var ws = new madrona.features.workspace(app.workspace);
        var shpTemplate = ws.actions.getByTitle("Shapefile")[0];
        var shpUrl = shpTemplate.getUrl(uids);

        handler = function(data) { self.updateScenario(data); };
    } else {
        if (self.dataMode() == 'manage') {
            url = '/seak/scenarios.geojson';
        } else if (self.dataMode() == 'shared') {
            url = '/seak/scenarios_shared.geojson';
        } else {
            console.log("ERROR: dataMode must be either manage or shared");
        }
        handler = function(data) { self.loadViewModel(data); };
    }

    var jqhxr = $.get(url, handler) 
    .success( function() { 
        if (scenario_uid) {
            var theScenario = self.getScenarioByUid(scenario_uid);
            self.selectFeature(theScenario);
        } 
     })
    .error(function() { self.scenarioLoadError(true); })
    .complete(function() { 
        self.scenarioLoadComplete(true); 
        $('.scenario-row').tooltip();
    });

  }