function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args),
		l, lx, ly;

	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
						
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
										
			// Draw each point
			l = 1;
			ctx.beginPath();
			while (TRUE) {
				lx = params['x' + l];
				ly = params['y' + l];
				if (lx !== UNDEFINED && ly !== UNDEFINED) {
					ctx.lineTo(lx, ly);
					l += 1;
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