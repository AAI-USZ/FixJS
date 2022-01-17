function(msg) {
  if (msg.status == 'ok') {
    if (msg.type == 'access_token_response') {
      if (msg.access_token) {
	Bum = new Bummer();
	Bum.access_token = msg.access_token;
	facebook_init_complete();
      }
      else if (!window.location.href.match('www.facebook.com/dialog') && !window.location.href.match('www.facebook.com/login')) {
	do_fb_auth();
      }
    }
    if (msg.type == 'uid_response') {
      // maybe assign a global var here.
    }
    if (msg.type == 'failure') {
      alert('failure: ' + msg.reason);
    } 
  }
}