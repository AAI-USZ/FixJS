function (req, args, env, callback, errback) {
	req._args = args || [];
	req._env = env || {};

	return $.ajax({
		type: 'POST', 
		async: true, 
		url: location.href,
		success: callback || function () {},
		fail: errback || function () {},
		data: req
	});
}