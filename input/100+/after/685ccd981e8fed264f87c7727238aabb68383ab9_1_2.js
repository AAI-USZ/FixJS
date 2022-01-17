function(entries) {
	var self = this;
	entries = $.isArray(entries) ? entries : [entries];
	var strip = function(value) {
		return value
			.replace("http://activitystrea.ms/schema/1.0/", "")
			.replace("http://js-kit.com/spec/e2/v1/", "");
	};
	var prepareActivity = function(activity, meta) {
		return {
			"avatar": activity.actor.avatar,
			"content": activity.object.content,
			"markers": meta.markers ? $.trim(meta.markers) : undefined,
			"name": activity.actor.name || activity.actor.title,
			"source": activity.source,
			"tags": meta.tags ? $.trim(meta.tags) : undefined,
			"target": activity.targets[0].id,
			"verb": verb(activity),
			"type": type(activity),
			"itemURIPattern": self.config.get("itemURIPattern", "")
		};
	};
	var verb = function(entry) { return strip(entry.verbs[0]); };
	var type = function(entry) { return strip(entry.object.objectTypes[0]); };
	var post, meta = {"markers": "", "tags": ""};
	$.map(entries, function(entry) {
		if (verb(entry) == "tag" && /tag|marker/.test(type(entry))) {
			meta[type(entry) + "s"] = entry.object.content;
		}
		if (verb(entry) == "post") {
			post = entry;
		}
	});
	if (post) {
		return prepareActivity(post, meta);
	}
	return $.map(entries, function(entry) {
		return prepareActivity(enry);
	});
}