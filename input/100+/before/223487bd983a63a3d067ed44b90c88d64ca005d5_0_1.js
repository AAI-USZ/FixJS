function(data, visualizer) {
	var self = this, items = [], roots = [];
	var isMoreRequest = this.lastRequest && !this.lastRequest.initial;
	data = data || {};
	if (data.result === "error") {
		this.handleErrorResponse(data, {
			"messageTarget": isMoreRequest ? self.dom.get("more") : self.dom.get("body"),
			"waitingHandler": function() {
				if (isMoreRequest) {
					self.requestMoreItems();
				} else {
					self.refresh();
				}
			}
		});
		return;
	}
	this.config.get("target").show();
	this.nextSince = data.nextSince || 0;
	this.nextPageAfter = data.nextPageAfter;
	var presentation = this._extractPresentationConfig(data);
	presentation.itemsPerPage = +presentation.itemsPerPage;
	this.config.extend(presentation);
	data.children.itemsPerPage = +data.children.itemsPerPage;
	data.children.maxDepth += data.children.maxDepth;
	this.config.set(
		"children",
		$.extend(
			this.config.get("children"),
			data.children
		)
	);
	this.config.extend(this._extractTimeframeConfig(data));
	data.entries = data.entries || [];
	this.events.publish({
		"topic": "onDataReceive",
		"data": {
			"entries": data.entries,
			"initial": !this.hasInitialData
		}
	});
	var sortOrder = this.config.get("sortOrder");
	$.each(data.entries, function(i, entry) {
		entry = self._normalizeEntry(entry);
		var item = self._initItem(entry);
		// avoiding problem when children can go before parents
		self._applyStructureUpdates("add", item);
		if (item.isRoot()) {
			self._addItemToList(roots, item, sortOrder);
		}
	});

	this.hasInitialData = true;
	this.isViewComplete = roots.length !== this.config.get("itemsPerPage");
	visualizer(roots);
}