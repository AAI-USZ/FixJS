function(url) {
	url = url || '';
	elgg.assertTypeOf('string', url);

	// jslint complains if you use /regexp/ shorthand here... ?!?!
	if ((new RegExp("^(https?:)?//", "i")).test(url)) {
		return url;
	}

	// 'javascript:'
	else if (url.indexOf('javascript:') === 0) {
		return url;
	}

	// watch those double escapes in JS.

	// 'install.php', 'install.php?step=step'
	else if ((new RegExp("^[^\/]*\\.php(\\?.*)?$", "i")).test(url)) {
		return elgg.config.wwwroot + url.ltrim('/');
	}

	// 'example.com', 'example.com/subpage'
	else if ((new RegExp("^[^/]*\\.", "i")).test(url)) {
		return 'http://' + url;
	}

	// 'page/handler', 'mod/plugin/file.php'
	else {
		// trim off any leading / because the site URL is stored
		// with a trailing /
		return elgg.config.wwwroot + url.ltrim('/');
	}
}