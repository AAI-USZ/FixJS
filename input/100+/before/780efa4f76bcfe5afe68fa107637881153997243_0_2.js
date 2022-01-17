function (url, params, callback, sync)
	{
		var r = new XHR()
		
		if (params)
			url += (url.indexOf('?') != -1 ? UrlEncode.paramDelimiter : '?') + UrlEncode.stringify(params)
		
		r.open('GET', url, !sync)
		if (!sync)
			r.onreadystatechange = function () { onreadystatechange.call(r) } // wrapped for FF 2.0
		r.callback = callback
		r.send(null)
		if (sync)
			onreadystatechange.call(r) // called for FF 3.5, 3.6
		
		return r
	}