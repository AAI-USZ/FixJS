function bum_it(el) {
    var data = $.parseJSON(el.attr('data'));
    var id = (data.comment_id ? 'comment_' + data.comment_id : (data.target_fbid ? data.target_fbid : (data.fbid ? data.fbid : '')));
    var title; 
    if (data.comment_id) {
	title = 
	    (
		data.comment_author ? 
		    data.comment_author + '\'s ' : 
		    ''
	    ) + 
	    'comment' +
	    (
		data.author ? 
		    ' on ' + data.author + '\'s post' :
		    ''
	    ) +
	    (
		data.comment_body ? 
		    ': ' + data.comment_body :
		    ''
	    );
    }
    else {
	title =
	    (
		data.author ? 
		    data.author + '\'s post' :
		    ''
	    ) + 
	    (
		data.author && data.body ? ': ' : ''
	    ) +
	    (
		data.body ? 
		    data.body :
		    ''
	    );
    }
    if (title.length > 200) { 
	title = title.substr(0, 197) + '...';
    }
    Bum.addBum(data.url);
    var params = {
	url: data.url,
	instance_id: Bum.instance_id,
	title: title
    };
    params['body'] = data.body;
    params['author'] = data.author;
    params['author_id'] = data.actor;
    params['link'] = data.link;
    params['attachments'] = data.attachments;
    params['comment_body'] = data.comment_body;
    params['comment_author'] = data.comment_author;
    params['comment_link'] = data.comment_link;
    $.ajax({
	url: Bummer_Api_Server + '/api/fucks/fuckthat',
	type: 'POST',
	data: params,
	headers: {
	    'X-CSRF-Token': Bum.csrf_token
	},
	error: function(req, stat, err) {
	    if (req.responseText == "No current fucker" && !Reauth_El) {
		// Re-attempt authentication
		Reauth_El = el;
		do_fb_auth();
	    } else {
		Reauth_El = null;
		log("Unable to bum - params: " + JSON.stringify(params) + " ERROR: " + err + " response: " + req.responseText);
	    }
	},  
	success: function(data, stat, req) {
	    // success!
       _gaq.push(['_trackPageview', '/chrome-ext-bum?ii=' + Bum.instance_id]);
	}
    });
    $('.bummer_' + id).each(function(i, el) {
	if (!Bum.link_data[data.url]) {
	    Bum.link_data[data.url] = { that: null };
	}
	if (!Bum.link_data[data.url].that) {
	    Bum.link_data[data.url].that = { url: data.url, fuck_count: 0 }
	}
	Bum.link_data[data.url].that.fuck_count++;
	$(el).html(bummed_text(data.url));
	$(el).attr('bummed', 1);
    });
}