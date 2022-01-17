function(e) {
		e = hui.event(e);
		var a = e.findByTag('a');
		if (a) {
			this.goToPage(parseInt(a.getAttribute('data')));
		}
	}