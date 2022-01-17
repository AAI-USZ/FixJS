function(e) {
		if (span) {
			$(span).remove();
		}
		var html = '<span class="page_browser_actions">';
		html += '<a href="'+$.glue.base_url+'?'+$(this).attr('id')+'/edit">edit</a> | ';
		html += '<a href="#" class="page_browser_copy">copy</a> | ';
		html += '<a href="#" class="page_browser_rename">rename</a> | ';
		html += '<a href="#" class="page_browser_delete">delete</a>';
		if ($(this).attr('id')+'.head' != $.glue.conf.page.startpage) {
			html += ' | <a href="#" class="page_browser_set_startpage">startpage</a>';
		}
		html += '</span>';
		
		span = $(html);
		$(this).append(span);
	}