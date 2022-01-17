function(options) {
      var feature, title;
      if (options == null) options = {};
      title = "";
      feature = options.feature;
      if (feature) {
        title = feature.getProperty("type") === "OrganizationBranch" ? feature.getProperty("organization_name") + " - " + feature.getProperty("name") : feature.getProperty("name");
      }
      return {
        title: title,
        url: "",
        body: ""
      };
    }