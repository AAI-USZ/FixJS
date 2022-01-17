function registerIssuesHook(username, repo) {

	var requestBody = [
			"hub.callback=" + querystring.escape('http://combotircbot.herokuapp.com/issue'),
			"hub.mode=" + querystring.escape('subscribe'),
			"hub.topic=" + querystring.escape('https://github.com/' + username + '/' + repo + '/events/issues')
			].join("&");

	var post_options = {
		hostname: 'https://api.github.com',
		port: 443,
		path: '/hub',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': requestBody.length
		}
	};
	
	console.log(requestBody);
	var post_req = https.request(post_options, function(res) {
	});
	post_req.write(requestBody);
	post_req.end();
}