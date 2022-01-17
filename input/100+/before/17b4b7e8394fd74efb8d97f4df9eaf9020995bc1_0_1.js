function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL;
	if (State.data['breadcrumb'].length) {
	    $('#breadcrumb').html(State.data['breadcrumb']).show();
	} else {
	    $('#breadcrumb').fadeOut(function(){
		$(this).empty();
	    });
	}

	var content_only = State.data['content_only'];
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = content_only;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = !content_only;
	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    }