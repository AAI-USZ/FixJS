function create_css_style_elements (size) {
		classes.push($.make('style', { id   : 'style' + size
									 }).text('.localImage { width: ' + size + 'px; }')
									   .attr('type', 'text/css'));
	}