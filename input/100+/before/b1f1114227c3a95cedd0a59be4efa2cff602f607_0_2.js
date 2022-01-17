function(event){
	options = {'url': window.location.pathname};
	window.History.pushState(null,
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = true;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = false;
	return false;
    }