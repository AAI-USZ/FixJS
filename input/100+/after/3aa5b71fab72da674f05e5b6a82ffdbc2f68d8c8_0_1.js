function(msg) {
  if (msg.status == 'ok') {
    if (msg.type == 'access_token_response') {
      if (msg.access_token) {
	Bum = new Bummer();
	Bum.access_token = msg.access_token;
	console.log("Setting access token to " + msg.access_token);
	facebook_init_complete();
      }
      else if (!window.location.href.match('www.facebook.com/dialog') && !window.location.href.match('www.facebook.com/login')) {
	console.log("No access token, showing auth window");
	do_fb_auth();
      }
    }
    if (msg.type == 'uid_response') {
      // maybe assign a global var here.
      console.log("FBUID is " + msg.id);
    }
    if (msg.type == 'failure') {
      console.log('failure: ' + msg.reason);
    } 
  }
}