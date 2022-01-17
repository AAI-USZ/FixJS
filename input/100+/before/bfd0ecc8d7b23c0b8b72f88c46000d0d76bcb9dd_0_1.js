function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL;
	if (State.data['breadcrumb'].length) {
	    $('#breadcrumb').hide().html(State.data['breadcrumb']).fadeIn();
	} else {
	    $('#breadcrumb').fadeOut(function(){
		$(this).empty();
	    });
	}
	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    }