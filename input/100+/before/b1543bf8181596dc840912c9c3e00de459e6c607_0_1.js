function(cb){
    var self = this;
    var devops_json;
    self.needs_creds = false;

    devops_json = self.devops_json ? JSON.parse(self.devops_json): {};

    // fill in missing optional fields
    devops_json = make_defaults(devops_json);

    _.each(devops_json.related_apis, function(api_obj, api_name){
      _.each(api_obj, function (value, key) {
        if (value === constants.EXTERNAL_TOKEN) {
          if (!self.creds || !self.creds[api_name] || self.creds[api_name][key] === undefined || self.creds[api_name][key] === "") {
            self.needs_creds = true;
          } else {
            api_obj[key] = self.creds[api_name][key];
          }
        }
      });
      devops_json[api_name] = api_obj;
    });

    if (devops_json.related_apis.github !== undefined) {
      devops_json.related_apis.github.repo = [].concat(devops_json.related_apis.github.repo);
    }
    self.devops = devops_json;
    cb();
  }