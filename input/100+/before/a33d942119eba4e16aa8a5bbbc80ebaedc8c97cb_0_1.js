function registerIssuesHook(username, repo) {
	var post_data = querystring.stringify({
		'hub.mode': 'subscribe',
		'hub.topic': 'https://github.com/' + username + '/' + repo + '/events/issues',
		'hub.callback': 'http://combotircbot.herokuapp.com/issue'
	});

	var post_options = {
		host: 'api.github.com',
		port: 443,
		path: '/hub',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	};

	var post_req = https.request(post_options, function(res) {
		res.setEncoding('utf8');
	});
	post_req.write(post_data);
	post_req.end();
}