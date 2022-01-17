function(a, b) {
				var map = {
					asc: a.get(key) > b.get(key),
					desc: a.get(key) < b.get(key)
				};

				// unknown types are ascending
				if (typeof map[type] == 'undefined')
					type = 'asc';

				return map[type];
			}