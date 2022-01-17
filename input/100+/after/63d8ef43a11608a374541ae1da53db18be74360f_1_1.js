function receiveMessage(event) {
		var data = JSON.parse(event.data),
			tid = new tiddlyweb.Tiddler(data.title);
		if (!id) {
			id = data.id;
		}

		function mergeTags(oldTags, newTags) {
			if (!newTags) {
				return oldTags;
			} else if (!oldTags) {
				return newTags || [];
			} else {
				$.each(newTags, function(i, tag) {
					if (tag.charAt(0) === '@' && !~oldTags.indexOf(tag)) {
						oldTags.push(tag);
					}
				});
				return oldTags;
			}
		}

		tid.recipe = new tiddlyweb.Recipe(data.space + '_private', '/');
		tid.get(function(tiddler) {
			details.set('data', {
				title: tiddler.title,
				text: tiddler.text,
				space: data.space,
				_source: data._source,
				tags: mergeTags(tiddler.tags, data.tags),
				origin: data.origin,
				quote: false
			});
			details.set('eventSrc', {
				origin: event.origin,
				source: event.source
			});
		}, function() {
			data.tags = data.tags || [];
			data.quote = true;
			details.set('data', data);
			details.set('eventSrc', {
				origin: event.origin,
				source: event.source
			});
		});
		window.removeEventListener('message', receiveMessage, false);
	}