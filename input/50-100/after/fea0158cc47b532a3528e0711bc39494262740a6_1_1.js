function() {
		var the_cookie = document.cookie.split(';');

		var idx = 0;
		if(the_cookie[idx].startsWith("TWISTED_SESSION")){
			idx = 1;
		}
		if (the_cookie[idx]) {
			this.data = unescape(the_cookie[idx]).evalJSON();
		}
		return this.data;
	}