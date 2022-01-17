function(e) {
		var entry = $(this).parents('.page_browser_entry');
		var old = $(entry).attr('id');
		var pn = prompt('Specify a name', old+'-copy');
		if (pn != null && pn != old) {
			$.glue.backend({ method: 'glue.copy_page', 'old': old, 'new': pn }, function(data) {
				copy = $(entry).clone();
				$(copy).attr('id', pn);
				$(copy).find('span.page_browser_pagename').siblings().remove();
				$(copy).children('.page_browser_pagename').html('<a href="'+$.glue.base_url+'?'+pn+'">'+pn+'</a>');
				$(entry).after(copy);
			});
		}
		return false;
	}