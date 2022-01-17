function(data) {
		this._super(data);
		data.report = repl("<a href=\"#!Report/%(doc_type)s/%(criteria_name)s\">\
								%(criteria_name)s</a>", data);
		data.edit = repl("<a href=\"#!Form/Search Criteria/%(name)s\">Edit</a>", data);
	}