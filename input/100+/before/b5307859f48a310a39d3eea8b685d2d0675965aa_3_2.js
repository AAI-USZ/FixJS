function(unique) {
	var self = this;
	if (!this.childrenRequest) {
		this.childrenRequest = Echo.StreamServer.API.request({
			"endpoint": "search",
			"apiBaseURL": this.config.get("apiBaseURL"),
			"onError": function(data) {
				self.showMessage({"type": "error", "data": data});
			},
			"onData": function(data) {
				var item = self.items[unique];
				var element = item.dom.get("expandChildren");
				/*if (data.result == "error") {
					self.handleErrorResponse(data, {
						"messageTarget": element,
						"waitingHandler": function() {
							self.requestChildrenItems(unique);
						}
					});
					if (!self.isWaitingForData(data))  {
						element.removeClass("echo-clickable")
							.delay(3000)
							.slideUp(self.config.get("children.moreButtonSlideTimeout"));
					}
					return;
				}*/
				if (!data.hasMoreChildren || data.hasMoreChildren === "false") {
					item.data.hasMoreChildren = false;
				}
				item.data.nextPageAfter = data.nextPageAfter;
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
	}
	this.childrenRequest.send({
		"data": {
			"q": this._constructChildrenSearchQuery(this.items[unique]),
			"appkey": this.config.get("appkey")
		}
	});
}