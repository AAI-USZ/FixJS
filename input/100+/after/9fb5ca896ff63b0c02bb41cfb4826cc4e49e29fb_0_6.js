function animateColor(fx) {
	var n = 3,
		i;
	// Only parse start and end colors once
	if (typeof fx.start !== 'object') {
		fx.start = toRgb(fx.start);
		fx.end = toRgb(fx.end);
	}
	fx.now = [];
	
	if (fx.start[3] !== 1 || fx.end[3] !== 1) {
		// If colors are RGBA, animate transparency
		n = 4;
	}
		
	// Calculate current frame for red, green, blue, and alpha
	for (i=0; i<n; i+=1) {
		fx.now[i] = fx.start[i] + (fx.end[i] - fx.start[i]) * fx.pos;
		// Only the red, green, and blue values must be integers
		if (i < 3) {
			fx.now[i] = round(fx.now[i]);
		}
	}
	if (fx.start[3] !== 1 || fx.end[3] !== 1) {
		// Only use RGBA if RGBA colors are given
		fx.now = 'rgba(' + fx.now.join(',') + ')';
	} else {
		// Otherwise, animate as solid colors
		fx.now.slice(0, 3);
		fx.now = 'rgb(' + fx.now.join(',') + ')';
	}
	// Animate colors for both canvas layers and DOM elements
	if (fx.elem.style) {
		fx.elem.style[fx.prop] = fx.now;
	} else {
		fx.elem[fx.prop] = fx.now;
	}
}