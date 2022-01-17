function(args) {
	var $elems = this, e, ctx,
		params = merge(new Prefs(), args);
	
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			if (params.autosave) {ctx.save();}
			rotateCanvas(ctx, params);
		}
	}
	return $elems;
}