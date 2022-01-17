function() {
	var $elems = this, e, ctx;
	
	for (e=0; e<$elems.length; e+=1) {
		ctx = getContext($elems[e]);
		if (ctx) {
			ctx.restore();
		}
	}
	return $elems;
}