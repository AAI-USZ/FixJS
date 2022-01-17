function () {
  var configModel = {label: $L("Configure"), disabled: true};
  var startSyncModel = {label: $L("Start sync"), disabled: true};
  
  PalmCall.call("palm://info.mobo.syncml.client.service", "getAccounts", {}).then(this, function (f){
    if (f.result.success === true) {
      log("Got accounts.");
      accounts = f.result.accounts;
      log("Now have " + accounts.length + " accounts.");
      if (accounts.length > 0) {
        currentAccount = 0;
      }
      this.initialized = true;
      configModel.disabled = false;
      startSyncModel.disabled = false;
      this.controller.modelChanged(configModel);
      this.controller.modelChanged(startSyncModel);
      this.refreshAccounts();
      log("Ready to go.");
    } else {
      log("Could not get accounts..." + JSON.stringify(f.result));
      showError(this.controller, "Service Error", "Could not get accounts. Service error: " + f.result.reason);
    }
  });
  
  this.controller.setupWidget(Mojo.Menu.appMenu, {}, AppAssistant.prototype.MenuModel);
  	
	/* setup widgets here */
	this.controller.setupWidget("btnConfig", {}, configModel);
	this.controller.setupWidget("btnStartSync", {}, startSyncModel);

	this.dropboxModel = {value: -1, choices: [ {label: $L("New"), value: -1}], disabled: true };
	this.dropBox = this.controller.setupWidget("lsAccounts", {label: $L("Account")}, this.dropboxModel);
	
	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.get("btnConfig"), Mojo.Event.tap, this.pushConfig.bind(this));
	Mojo.Event.listen(this.controller.get("btnStartSync"), Mojo.Event.tap, this.startSync.bind(this));
}