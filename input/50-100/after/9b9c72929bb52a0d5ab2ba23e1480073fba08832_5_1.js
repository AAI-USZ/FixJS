function($resource, appSettings) {
      var actions, defaults, proj;
      defaults = {
        applicationId: appSettings.applicationId
      };
      actions = {
        gridpageJson: {
          method: 'GET',
          isArray: false,
          params: {
            action: "grids"
          }
        }
      };
      proj = $resource(appSettings.serverUrl + "/client/json/:applicationId/:link?callback=JSON_CALLBACK", defaults, actions);
      return proj;
    }