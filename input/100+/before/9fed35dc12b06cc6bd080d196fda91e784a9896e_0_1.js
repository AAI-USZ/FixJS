function init(message, linkText, link, _options) {

		$('#hi-bar-content', bar).html(message + '<a target="_blank" href="' + link +'">' + linkText + '</a>');

		//detect state cookie
		var hibar_closed = $.cookie(HIBAR_CLOSED_COOKIE_NAME + code) == '1';

		if(!hibar_closed) {
			self.show();
		}

		if(_options) {
			//add options if options array exists
			for(var key in _options) {
				options[key] = _options[key];
			}
		}
		applyOptions();

		return self;

	}