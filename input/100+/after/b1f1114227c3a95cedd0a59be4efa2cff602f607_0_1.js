function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL

	if (State.data['type'] == 'new') {
	    $('#breadcrumb').html('<li><a href="' + State.data['href'] + '">' + State.data['content'] + '</a>');
	} else if (State.data['type'] == 'append') {
	    var last = $('#breadcrumb li').last();
	    var first = $('#breadcrumb li').first();

	    console.log(last.children('a'));
	    console.log(State.data['href']);

	    if (first == last || last.prev().children('a').attr('href') != State.data['href']) {
		last.append('<span class="divider">/<span/>');
		$('#breadcrumb').append('<li><a href="' + State.data['href'] + '">' + State.data['content'] + '</a>');
	    } else {
		last.prev().children('span').remove();
		last.remove();
	    }
	}

	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    }