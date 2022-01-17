function(data) {
		this._super(data);
		data.report = repl("<a href=\"#!Report2/%(ref_doctype)s/%(name)s\">\
								%(name)s</a>", data);
	}