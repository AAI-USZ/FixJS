function date(gist) {
		if (!gist || !gist.date || !_.isDate(gist.date)) throw new Error("the gist must have a date property of type date");
		return gist.created_at;
	}