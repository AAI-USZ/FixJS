function(activity, meta) {
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
			"itemURIPattern": self.config.get("itemURIPattern")
		};
	}