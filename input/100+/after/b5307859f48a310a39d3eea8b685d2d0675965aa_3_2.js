function(unique) {
	var self = this;
	var childrenRequest = Echo.StreamServer.API.request({
		"endpoint": "search",
		"apiBaseURL": this.config.get("apiBaseURL"),
		"data": {
			"q": this._constructChildrenSearchQuery(this.items[unique]),
			"appkey": this.config.get("appkey")
		},
		"onOpen": function() {
			var target = self.items[unique].dom.get("expandChildren");
			self.showError({}, {
				"retryIn": 0,
				"target": target,
				"request": childrenRequest
			});
		},
		"onError": function(data, options) {
			options.target = self.items[unique].dom.get("expandChildren");
			options.request = childrenRequest;
			self.showError(data, options);
		},
		"onData": function(data) {
			var item = self.items[unique];
			var element = item.dom.get("expandChildren");
			if (!data.hasMoreChildren || data.hasMoreChildren === "false") {
				item.set("data.hasMoreChildren", false);
			}
			item.set("data.nextPageAfter", data.nextPageAfter);
			data.entries = self._actualizeChildrenList(item, data.entries);
			self.events.publish({
				"topic": "onDataReceive",
				"data": {
					"entries": data.entries,
					"initial": false
				}
			});
			var children = [];
			$.each(data.entries, function(i, entry) {
				var _item = self._initItem(entry);
				self._applyStructureUpdates("add", _item);
				if (entry.parentUnique === item.get("data.unique")) {
					children.push(_item);
				}
			});
			self._placeChildrenItems(item, children);
		}
	});
	childrenRequest.send();
}