function(msg) {
    if (msg.type == 'access_token_response') {
	if (msg.access_token) {
	    Bum = new Bummer();
	    Bum.access_token = msg.access_token;
	    facebook_init_complete();
	}
	else if (!window.location.href.match('www.facebook.com/dialog')) {
      do_fb_auth();
	}
    }
}