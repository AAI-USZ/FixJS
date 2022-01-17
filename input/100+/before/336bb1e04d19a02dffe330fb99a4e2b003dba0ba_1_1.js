function(callback) {
	var self = this;
	var item = $.extend(true, {}, this.items.post);
	var params = $.extend({}, this.params);
	var target = this.params.q.replace(/childrenof:(http:\/\/\S+).*/, function($0, $1) {
		return $1;
	});
	item.targets[0].id = target;
	item.targets[0].conversationID = target;
	item.object.id = target;
	var luReq = Echo.StreamServer.API.request({
		"endpoint": "search",
		"recurring": true,
		"onData": function(response) {
			if (response && response.entries && response.entries.length) {
				QUnit.equal(response.entries[0].object.content, self.items.post.object.content, 
					"checking if the live update mechanism works correctly after posting");
				luReq.abort();
				callback();
			}
		},
		"data": $.extend({}, params)
	});
	var sReq = Echo.StreamServer.API.request({
		"endpoint": "submit",
		"onData": function(response) {
			luReq.send({force: true});
		},
		"data": $.extend({}, params, {
			content: item,
			targetURL: target
		})
	});
	sReq.send();
}