function(content,result) {
		$(this).trigger('loadSuccessful',arguments);
		content.empty().css({'background': 'none', 'height': 'auto', 'min-height': 'auto'});
		if (result.bStateError) {
			ls.msg.error(null, result.sMsg);
		} else {
			content.html(result.sText);
			ls.hook.run('ls_block_onload_html_after',arguments,this);
		}
	}