function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL
	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    }