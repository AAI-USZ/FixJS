function(args) {
	var $elems = this,
		ctx, params = merge(new Prefs(), args),
		img, pattern, imgCtx;

	// Create pattern when image loads
	function create() {
		// Create pattern
		pattern = ctx.createPattern(img, params.repeat);
	}
	function onload() {
		create();
		// Run callback function if defined
		if (params.load) {
			params.load.call($elems[0], pattern);
		}
	}
	
	ctx = getContext($elems[0]);
	if (ctx) {
	
		// Draw when image is loaded (if load() callback function is defined)
		if (typeof params.source === 'function') {
			
			img = document.createElement('canvas');
			img.width = params.width;
			img.height = params.height;
			imgCtx = getContext(img);
			params.source.call(img, imgCtx);
			onload();
			
		} else {
			
			// Use image element, if not, a image URL
			imgCtx = params.source.getContext;
			if (params.source.src || imgCtx) {
				img = params.source;
			} else {
				img = new Image();
				img.src = params.source;
			}
			
			// Draw image if already loaded
			if (img.complete || imgCtx) {
				onload();
			} else {
				img.onload = onload;
			}
			
		}
	} else {
		pattern = NULL;
	}
	return pattern;
}