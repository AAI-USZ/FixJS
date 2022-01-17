function self(args) {
	var $elems = this, e, ctx, params;
	
	// Convert single function argument to object
	if (args && !args.fn) {
		args = {fn: args};
	}
	params = merge(new Prefs(), args);
	
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			args.fn.call($elems[e], ctx);
		}
	}
	return $elems;
}