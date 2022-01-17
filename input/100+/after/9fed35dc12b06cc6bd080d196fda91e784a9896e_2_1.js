function init(message, linkText, linkHref, _options) {

		$('#hi-bar-title').html(message);
		var link = $('#hi-bar-link');
		link.html(linkText);
		link.attr('href', linkHref);

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