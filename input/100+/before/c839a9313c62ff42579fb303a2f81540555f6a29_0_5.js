function self(args) {
	var $elems = this, $elem, e, ctx,
		params = merge(new Prefs(), args);

	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		ctx = getContext($elems[e]);
		if (ctx) {
			
			addLayer($elems[e], args, self);
			setGlobalProps(ctx, params);
			
			// Set text-specific properties
			ctx.textBaseline = params.baseline;
			ctx.textAlign = params.align;
			ctx.font = params.font;
			
			// Retrieve text's width and height
			measureText($elems[e], ctx, params);
			transformShape(e, ctx, params, params.width, params.height);
			
			ctx.fillText(params.text, params.x, params.y);
			// Prevent extra shadow created by stroke (but only when fill is present)
			if (params.fillStyle !== 'transparent') {
				ctx.shadowColor = 'transparent';
			}
			ctx.strokeText(params.text, params.x, params.y);
			
			// Detect jCanvas events
			if (params._event) {
				ctx.beginPath();
				ctx.rect(
					params.x - params.width / 2,
					params.y - params.height / 2,
					params.width,
					params.height
				);
				ctx.restore();
				checkEvents($elems[e], ctx, args);
				ctx.closePath();
			} else {
				ctx.restore();
			}
			
		}
	}
	cache = params;
	return $elems;
}