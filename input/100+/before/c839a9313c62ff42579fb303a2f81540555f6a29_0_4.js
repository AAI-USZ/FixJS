function self(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args),
		// dtheta is polygon's central angle
		dtheta = (2 * PI) / params.sides,
		// hdtheta is half of dtheta
		hdtheta = PI / params.sides,
		// theta is polygon's starting angle
		theta = hdtheta + (PI / 2),
		// apothem is distance from polygon's center to the middle of its side
		apothem = params.radius * cos(dtheta / 2),
		x, y, i;
	params.closed = TRUE;
		
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			transformShape(e, ctx, params, params.radius*2);

			// Calculate points and draw
			ctx.beginPath();
			for (i=0; i<params.sides; i+=1) {
				// Draw side of polygon
				x = params.x + round(params.radius * cos(theta));
				y = params.y + round(params.radius * sin(theta));
				ctx.lineTo(x, y);
				// Project side if chosen
				if (params.projection) {
					// Sides are projected from the polygon's apothem
					x = params.x + round((apothem + apothem*params.projection) * cos(theta + hdtheta));
					y = params.y + round((apothem + apothem*params.projection) * sin(theta + hdtheta));
					ctx.lineTo(x, y);
				}
				theta += dtheta;
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