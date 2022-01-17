function RemoteActHandler(options) {
  options = options || {};
  ActHandler.call(this, options);

  var self = this,
    env = this.env = options.env === "dev" ? "development" : options.env !== undefined ? options.env : "millicore";


  // set up access to proper node endpoint
  switch (options.env) {
    case "dev":
    case "live":
      fhm.apps.hosts(fhc, this.guid, function(err, res) {
        if(err) {
          //leave defaults
          return;
        }
        console.log(res);
        self.target = url.parse(res.hosts[env + "-url"]).hostname;
      });
      break;
  }
}