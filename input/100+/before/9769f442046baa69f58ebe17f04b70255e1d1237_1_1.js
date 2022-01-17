function (ctx) {
	var result;
	if (ctx.mechanicsCtx.headers != null) {
		result = {
			endpointId: ctx.mechanicsCtx.headers.endpointId,
			serial: ctx.mechanicsCtx.headers.serial
		};
	}
	else if(ctx.mechanicsCtx.req != null)
	{
		if (ctx.mechanicsCtx.req.body._endpointId) {
			result = {
				endpointId: ctx.mechanicsCtx.req.body._endpointId,
				serial: ctx.mechanicsCtx.req.body._serial
			};
		}
	}
	return result;
}