function (url, params, callback, sync)
	{
		var r = new XHR()
		
		r.open('POST', url, !sync)
		r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=' + this.charset)
		if (!sync)
			r.onreadystatechange = function () { onreadystatechange.call(r) } // wrapped for FF 2.0
		r.callback = callback
		r.send(typeof params == 'string' ? params : UrlEncode.stringify(params))
		if (sync)
			onreadystatechange.call(r)
		
		return r
	}