function(res) {
		var out = [];
		res.on('data', function(chunk) {
			out.push(chunk);
		});
		res.on('end', function() {
			var ctxLen = res.headers['content-length'];
			if (!ctxLen || ctxLen == '0') {
				var ret = {code: res.statusCode};
				if (res.statusCode != 200) {
					ret.error = 'E' + res.statusCode;
				}
				onret(ret);
				return;
			}
			var resp = out.join('');
			var ret;
			try {
				ret = JSON.parse(resp);
				if (res.statusCode == 200) {
					ret = {code: 200, data: ret};
				} else {
					ret.code = res.statusCode;
				}
			} catch (e) {
				ret = {code: -2, error: e.toString()};
			}
			onret(ret);
		});
	}