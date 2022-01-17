function(tag, filter) {
		tag = parseInt(tag);
		filter = parseInt(filter);
		var result = _.filter(this.candidate_apps, function(app) {
			return app.tags[tag] == filter;
		});
		if (result.length < 7) {
			this.end(_.shuffle(result).slice(0,2));
			return;
		}
		this.candidate_apps = result;
		this.update_progress();
		this.next_question();
	}