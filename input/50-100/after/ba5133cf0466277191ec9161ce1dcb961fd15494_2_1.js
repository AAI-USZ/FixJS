function(a, b) {
				var ak = a.get(key),
					bk = b.get(key),
					map = {
						asc: c(ak, bk),
						desc: c(bk, ak)
					};

				// unknown types are ascending
				if (typeof map[type] == 'undefined')
					type = 'asc';

				return map[type];
			}