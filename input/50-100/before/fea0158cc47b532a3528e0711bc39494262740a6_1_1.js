function() {
		var the_cookie = document.cookie.split(';');
		if (the_cookie[0]) {
			this.data = unescape(the_cookie[0]).evalJSON();
		}
		return this.data;
	}