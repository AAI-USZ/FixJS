function() {
		if(window.location.href.indexOf('?') > 0) {
			document.cookie="dynmapurl=" + escape(window.location);
		}
	}