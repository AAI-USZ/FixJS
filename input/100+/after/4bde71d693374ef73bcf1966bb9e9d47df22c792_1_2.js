function(response) {
		var docs = response.response.docs;
		var view = this.meta('view');
		console.log(response);
		if(docs.length > 0 ) {
			var ret = [];
			for (var i = 0; i < docs.length; i++) {
				var tempEvent = new StubHubEventModel(docs[i]);
				ret.push(tempEvent);
				//view.addEvent(tempEvent);
			}
			return ret;
		} else {
			console.log('ColEvents: no event found for query');
			return {};
		}
	}