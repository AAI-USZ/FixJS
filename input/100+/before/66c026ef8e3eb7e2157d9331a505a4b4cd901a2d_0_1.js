function inject(script) {
		var el = document.createElement('script');
		el.setAttribute("type", "application/javascript");
		el.setAttribute("src", script);
		document.body.appendChild(el); // run the script
		document.body.removeChild(el); // clean up
	}