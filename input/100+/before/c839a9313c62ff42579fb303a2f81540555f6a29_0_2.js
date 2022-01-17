function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args);

	// Change default end angle to radians if necessary
	if (!params.inDegrees && params.end === 360) {
		params.end = PI * 2;
	}
	
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			transformShape(e, ctx, params, params.radius*2);
	
			// Draw arc
			ctx.beginPath();
			ctx.arc(params.x, params.y, params.radius, (params.start*params.toRad)-(PI/2), (params.end*params.toRad)-(PI/2), params.ccw);
			// Close path if chosen
			ctx.restore();
			// Check for jCanvas events
			if (params._event) {
				checkEvents($elems[e], ctx, args);
			}
			closePath(ctx, params);
		
		}
	}
	return $elems;
}