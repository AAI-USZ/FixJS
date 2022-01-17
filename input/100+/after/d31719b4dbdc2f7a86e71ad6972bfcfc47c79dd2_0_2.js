function(opr, opd, k, e) {
	var xe = extend(e); bind(xe, opr.opd, opd); bind(xe, opr.eopd, e); return perform(opr.body, k, xe) }