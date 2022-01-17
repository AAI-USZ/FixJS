function(event){
	options = {'url': window.location.pathname};
	window.History.pushState({'type': 'new',
				  'content': $(this).html(),
				  'href': $(this).attr('href')},
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = false;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = true;
	return false;
    }