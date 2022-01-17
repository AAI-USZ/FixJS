function () { 
	this.configModel = {label: $L("Configure"), disabled: true};
  this.startSyncModel = {label: $L("Start sync"), disabled: true};

  this.controller.setupWidget(Mojo.Menu.appMenu, {}, AppAssistant.prototype.MenuModel);
  	
	/* setup widgets here */
	this.controller.setupWidget("btnConfig", {}, this.configModel);
	this.controller.setupWidget("btnStartSync", {}, this.startSyncModel);

	this.dropboxModel = {value: -1, choices: [ {label: $L("New"), value: -1}], disabled: true };
	this.dropBox = this.controller.setupWidget("lsAccounts", {label: $L("Account")}, this.dropboxModel);
	
	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.get("btnConfig"), Mojo.Event.tap, this.pushConfig.bind(this));
	Mojo.Event.listen(this.controller.get("btnStartSync"), Mojo.Event.tap, this.startSync.bind(this));
}