function(opd, k, e) {
	xe = extend(e); bind(xe, fun.formal, opd); bind(xe, fun.eformal, e); return perform(fun.body, k, xe) }