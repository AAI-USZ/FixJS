function() {
	var navbar_id = $('#navbar-main-list > li.active').prop('id');
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL;

	var content_only = State.data['content_only'];
	if (content_only === undefined) {
	    window.location = relativeURL;
	}

	if (navbar_id !== State.data['navbar_id']) {
	    var navbar_target;
	    if (State.data['navbar_id'] !== undefined) {
		navbar_target = $('#' + State.data['navbar_id']);
	    } else {
		navbar_target = null;
	    }
	    moveNavbar(navbar_target);
	}

	if (State.data['breadcrumb'] !== undefined
	    && State.data['breadcrumb'].length) {
	    $('#breadcrumb').html(State.data['breadcrumb']).show();
	} else {
	    $('#breadcrumb').fadeOut(function(){
		$(this).empty();
	    });
	}

	g_page_reload_ajax.callbacks['success'][0]['disabled'] = content_only;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = !content_only;
	g_page_reload_ajax.url = relativeURL;
	console.log(content_only);
	console.log(g_page_reload_ajax);
	g_page_reload_ajax.start();
    }