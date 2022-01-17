function(e) {
		e = hui.event(e);
		var a = e.findByTag('a');
		if (a && hui.cls.has(a.parentNode,'part_poster_navigator')) {
			this.goToPage(parseInt(a.getAttribute('data')));
		}
	}