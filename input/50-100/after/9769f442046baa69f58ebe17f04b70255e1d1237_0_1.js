function (ctx) {
	var result;
	var headers = ctx.mechanicsCtx.headers;
	if (headers != null) {
		result = headers.auth;
	}
	else {
		var req = ctx.mechanicsCtx.req;
		if (req != null && req.cookies != null) {
			result = req.cookies.auth;
		}
	}
	return result;
}