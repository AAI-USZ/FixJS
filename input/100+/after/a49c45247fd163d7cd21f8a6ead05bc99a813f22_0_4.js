function(data, visualizer) {
	var self = this, items = [], roots = [];
	var isMoreRequest = this.lastRequest && !this.lastRequest.initial;
	data = data || {};
	if (data.result === "error") {
		this.handleErrorResponse(data, {
			"messageTarget": isMoreRequest ? self.dom.get("more") : self.dom.get("body"),
			"waitingHandler": function() {
				if (isMoreRequest) {
					self.moreRequestItems();
				} else {
					self.refresh();
				}
			}
		});
		return;
	}
	//this.cleanupErrorHandlers(true);
	this.config.get("target").show();
	//this.changeLiveUpdatesTimeout(data);
	this.nextSince = data.nextSince || 0;
	this.nextPageAfter = data.nextPageAfter;
	this.config.extend(this.extractPresentationConfig(data));
	data.children.itemsPerPage = +data.children.itemsPerPage;
	this.config.set(
		"children",
		$.extend(
			data.children,
			this.config.get("children")
		)
	);
	this.config.extend(this.extractTimeframeConfig(data));
	var sortOrder = this.config.get("sortOrder");
	data.entries = data.entries || [];

	this.events.publish({
		"topic": "Stream.onDataReceive",
		"data": self.prepareBroadcastParams({
			"entries": data.entries,
			"initial": !this.hasInitialData
		})
	});
	$.each(data.entries, function(i, entry) {
		entry = self.normalizeEntry(entry);
		var item = self.initItem(entry);
		// avoiding problem when children can go before parents
		self.applyStructureUpdates("add", item);
		if (item.isRoot()) {
			self.addItemToList(roots, item, sortOrder);
		}
	});

	this.hasInitialData = true;
	this.isViewComplete = roots.length !== this.config.get("itemsPerPage");
	visualizer(roots);
	//this.startLiveUpdates();
}