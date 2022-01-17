function (event) {
	this.configModel.disabled = true;
  this.startSyncModel.disabled = true;
  this.controller.modelChanged(this.configModel);
  this.controller.modelChanged(this.startSyncModel);
  
  PalmCall.call("palm://info.mobo.syncml.client.service", "getAccounts", {}).then(this, function (f){
    if (f.result.success === true) {
      log("Got accounts.");
      accounts = f.result.accounts;
      log("Now have " + accounts.length + " accounts.");
      if (accounts.length > 0) {
        currentAccount = 0;
      }
      this.configModel.disabled = false;
      this.startSyncModel.disabled = false;
      this.controller.modelChanged(this.configModel);
      this.controller.modelChanged(this.startSyncModel);
      this.refreshAccounts();
      log("Ready to go.");
    } else {
      log("Could not get accounts..." + JSON.stringify(f.result));
      showError(this.controller, "Service Error", "Could not get accounts. Service error: " + f.result.reason);
    }
  });
}