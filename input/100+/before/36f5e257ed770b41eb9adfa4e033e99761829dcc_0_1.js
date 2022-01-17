function(data) {
		this._super(data);
		if(data.status=='Open' || data.status=='To Reply') {
			data.label_type = 'important'
		}
		else if(data.status=='Closed') {
			data.label_type = 'success'
		}
		else if(data.status=='Hold') {
			data.label_type = 'info'
		}
		else if(data.status=='Waiting for Customer') {
			data.label_type = 'info'
			data.status = 'Waiting'
		}
		data.status_html = repl('<span class="label label-%(label_type)s">%(status)s</span>', data);
		var a = $(data.status_html).click(function() {
			me.set_filter('status', $(this).text());
		});
		
		// escape double quotes
		data.description = cstr(data.subject).replace(/"/gi, '\"')
			+ " | " + cstr(data.description).replace(/"/gi, '\"');
		
		// description
		if(data.description && data.description.length > 50) {
			data.description = '<span title="'+data.description+'">' + data.description.substr(0,50) + '...</span>';
		}
	}