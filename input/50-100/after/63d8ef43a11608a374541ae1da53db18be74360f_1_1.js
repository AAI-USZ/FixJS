function(tiddler) {
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
		}