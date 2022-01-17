function measureText(elem, ctx, params) {
	var originalSize, sizeMatch,
		sizeExp = /\b(\d*\.?\d*)\w\w\b/gi;
	
	// Used cached width/height if possible
	if (cache.text === params.text && cache.font === params.font) {
		
		params.width = cache.width;
		params.height = cache.height;
		
	} else {
		
		// Calculate text width
		params.width = ctx.measureText(params.text).width;
		
		// Save original font size
		originalSize = elem.style.fontSize;
		// Get specified font size
		sizeMatch = params.font.match(sizeExp);
		if (sizeMatch) {
			elem.style.fontSize = params.font.match(sizeExp)[0];
		}
		// Save text width and height in parameters object
		params.height = parseFloat($.css(elem, 'fontSize'));
		// Reset font size to original size
		elem.style.fontSize = originalSize;
		
	}
}