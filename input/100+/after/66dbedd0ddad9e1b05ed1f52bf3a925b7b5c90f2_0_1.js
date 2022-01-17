function(data) {
			if (data.length === 0) {
				var ret = {code: res.statusCode};
				if (res.statusCode != 200) {
					ret.error = 'E' + res.statusCode;
				}
				onret(ret);
				return;
			}
			var ret;
			try {
				ret = JSON.parse(data);
				if (res.statusCode == 200) {
					ret = {code: 200, data: ret};
				} else {
					ret.code = res.statusCode;
				}
			} catch (e) {
				ret = {code: -2, error: e.toString(), detail: e};
			}
			onret(ret);
		}