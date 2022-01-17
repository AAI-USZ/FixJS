function(data) {
			$('#page_browser_startpage').remove();
			$(entry).children('.page_browser_pagename').after(' <span id="page_browser_startpage">[startpage]</span>');
			$.glue.conf.page.startpage = pn+'.head';
			if (span) {
				$(entry).trigger('mouseenter');
			}
		}