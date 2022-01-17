function(data) {
		this._super(data);
		
		if(wn.boot.profile.all_read.indexOf(data.doc_type)==-1) {
			data.report = repl("<span style=\"color:#999\">%(criteria_name)s</span>", data);
			data.edit = repl("<span style=\"color:#999\">Edit</span>", data);
		} else {
			data.report = repl("<a href=\"#!Report/%(doc_type)s/%(criteria_name)s\">\
									%(criteria_name)s</a>", data);
			data.edit = repl("<a href=\"#!Form/Search Criteria/%(name)s\">Edit</a>", data);
		}
	}