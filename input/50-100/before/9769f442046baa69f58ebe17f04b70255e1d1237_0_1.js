function (ctx) {
	var result;
	if (ctx.mechanicsCtx.headers != null) {
		result = ctx.mechanicsCtx.headers.auth;
	}
	else if (ctx.mechanicsCtx.req != null) {
		if (ctx.mechanicsCtx.req.cookies != null) {
			result = ctx.mechanicsCtx.req.cookies.auth;
		}
	}
	return result;
}