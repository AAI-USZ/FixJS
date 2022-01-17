function(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args);

	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			
			transformShape(e, ctx, params, params.width, params.height);
			
			// Clear entire canvas
			if (!params.x || !params.y || !params.width || !params.height) {
				ctx.clearRect(0, 0, $elems[e].width, $elems[e].height);
			} else {
				ctx.clearRect(params.x-params.width/2, params.y-params.height/2, params.width, params.height);
			}
			
		}
	}
	return $elems;
}