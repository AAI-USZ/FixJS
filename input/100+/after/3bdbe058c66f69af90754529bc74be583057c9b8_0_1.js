function(request) {
	var session;
	if (request.req.headers.cookie) {
		var cookies = querystring.parse(request.req.headers.cookie, ';');
		if (cookies.BGTSESSION) {
			session = BGTSession.getSession(cookies.BGTSESSION);
		}
	}
	if (session) {
		//util.log('session reconnected');
	} else {
		//util.log('issuing new session');
		session = BGTSession.newSession();
		request.res.setHeader('Set-Cookie', ['BGTSESSION=' + session.key + '; path=/bgt']);
	}
	request.session = session;
}