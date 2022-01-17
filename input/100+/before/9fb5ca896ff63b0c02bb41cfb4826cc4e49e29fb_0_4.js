function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args),
		l , lc,
		lx, ly,
		lcx1, lcy1,
		lcx2, lcy2;

	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			
			// Draw each point
			l = 2;
			lc = 1;
			ctx.beginPath();
			ctx.moveTo(params.x1, params.y1);
			while (TRUE) {
				lx = params['x' + l];
				ly = params['y' + l];
				lcx1 = params['cx' + lc];
				lcy1 = params['cy' + lc];
				lcx2 = params['cx' + (lc+1)];
				lcy2 = params['cy' + (lc+1)];
				if (lx !== UNDEFINED && ly !== UNDEFINED && lcx1 !== UNDEFINED && lcy1 !== UNDEFINED && lcx2 !== UNDEFINED && lcy2 !== UNDEFINED) {
					ctx.bezierCurveTo(lcx1, lcy1, lcx2, lcy2, lx, ly);
					l += 1;
					lc += 2;
				} else {
					break;
				}
			}
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