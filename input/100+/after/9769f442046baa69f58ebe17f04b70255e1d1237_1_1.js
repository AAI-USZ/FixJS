function (ctx) {
	var result;
	var headers = ctx.mechanicsCtx.headers;
	if (headers != null) {
		result = {
			endpointId: headers.endpointId,
			serial: headers.serial
		};
	}
	else {
		var req = ctx.mechanicsCtx.req;
		if(req != null)
		{
			if (req.query._endpointId) {
				result = {
					endpointId: req.query._endpointId,
					serial: req.query._serial
				};
			}
		}
	}
	return result;
}