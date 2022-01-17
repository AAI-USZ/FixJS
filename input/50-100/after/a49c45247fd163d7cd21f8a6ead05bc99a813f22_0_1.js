function(data) {
	var self = this;
	data = data || {};
	if (data.result === "error") {
		this.startLiveUpdates();
		return;
	}
	this.nextSince = data.nextSince || 0;
	this.refreshItemsDate();
	this.checkTimeframeSatisfy();
	this.applyLiveUpdates(data.entries);
	this.render("state");
	this.executeNextActivity();
	this.startLiveUpdates();
}