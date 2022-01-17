function get_referer(req, options) {

	var referer = req.headers['referer'] || '/';

	// 防止死跳转

	if (referer.indexOf(options.login_path) === 0 || referer.indexOf(options.logout_path) === 0) {

		referer = '/';

	}

	return referer;

}