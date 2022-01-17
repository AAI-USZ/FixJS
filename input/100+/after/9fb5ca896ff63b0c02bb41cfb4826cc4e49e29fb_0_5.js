function toRgb(color) {
	var originalColor, elem,
		rgb = [],
		multiple = 1;
	
	// Deal with hexadecimal colors and color names
	if (color.match(/^#?[a-z0-9]+$/i)) {
		// Deal with complete transparency
		if (color === 'transparent') {
			color = 'rgba(255, 255, 255, 0)';
		}
		elem = document.head;
		originalColor = elem.style.color;
		elem.style.color = color;
		color = $.css(elem, 'color');
		elem.style.color = originalColor;
	}
	// Parse RGB string
	if (color.match(/^rgb/i)) {
		rgb = color.match(/[0-9]+/gi);
		// Deal with RGB percentages
		if (color.match(/%/gi)) {
			multiple = 2.55;
		}
		rgb[0] *= multiple;
		rgb[1] *= multiple;
		rgb[2] *= multiple;
		if (rgb[3] !== UNDEFINED) {
			rgb[3] = parseFloat(rgb[3]);
		}
		if (rgb[3] === UNDEFINED) {rgb[3] = 1;}
	}
	return rgb;
}