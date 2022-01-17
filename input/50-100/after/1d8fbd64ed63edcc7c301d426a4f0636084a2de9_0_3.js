function (data) {
					var old, neew;
					old = flatten.call(data[0]);
					neew = flatten.call(data[1]);
					if (old.length || neew.length) {
						result.sort();
						promise.emit('change', { data: result, old: old, new: neew });
					}
				}