function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args),
		controlW = params.width * 4/3,
		controlH = params.height;
	
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			transformShape(e, ctx, params, params.width, params.height);
			
			// Create ellipse using curves
			ctx.beginPath();
			ctx.moveTo(params.x, params.y-controlH/2);
			// Left side
			ctx.bezierCurveTo(params.x-controlW/2, params.y-controlH/2, params.x-controlW/2, params.y+controlH/2, params.x, params.y+controlH/2);
			// Right side
			ctx.bezierCurveTo(params.x+controlW/2, params.y+controlH/2, params.x+controlW/2, params.y-controlH/2, params.x, params.y-controlH/2);
			// Check for jCanvas events
			if (params._event) {
				checkEvents($elems[e], ctx, args);
			}
			// Close path if chosen
			closePath(ctx, params);
		}
	}
	return $elems;
}