function(data) {
		this._super(data);
		
		if(wn.boot.profile.all_read.indexOf(data.ref_doctype)==-1) {
			data.report = repl("<span style=\"color:#999\">%(name)s</span>", data);
		} else {
			data.report = repl("<a href=\"#!Report2/%(ref_doctype)s/%(name)s\">\
									%(name)s</a>", data);
		}
}