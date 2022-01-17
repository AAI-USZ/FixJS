function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args),
		x1, y1, x2, y2, r;

	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
		
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			transformShape(e, ctx, params, params.width, params.height);
			
			ctx.beginPath();
			x1 = params.x - params.width/2;
			y1 = params.y - params.height/2;
			r = params.cornerRadius;
			// Draw a rounded rectangle if chosen
			if (r) {
				params.closed = TRUE;
				x2 = params.x + params.width/2;
				y2 = params.y + params.height/2;
				// Prevent over-rounded corners
				if ((x2 - x1) - (2 * r) < 0) {
					r = (x2 - x1) / 2;
				}
				if ((y2 - y1) - (2 * r) < 0) {
					r = (y2 - y1) / 2;
				}
				ctx.moveTo(x1+r,y1);
				ctx.lineTo(x2-r,y1);
				ctx.arc(x2-r, y1+r, r, 3*PI/2, PI*2, FALSE);
				ctx.lineTo(x2,y2-r);
				ctx.arc(x2-r, y2-r, r, 0, PI/2, FALSE);
				ctx.lineTo(x1+r,y2);
				ctx.arc(x1+r, y2-r, r, PI/2, PI, FALSE);
				ctx.lineTo(x1,y1+r);
				ctx.arc(x1+r, y1+r, r, PI, 3*PI/2, FALSE);
			} else {
				ctx.rect(x1, y1, params.width, params.height);
			}
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