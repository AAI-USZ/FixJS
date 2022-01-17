function (old, neew) {
					old = flatten.call(old);
					neew = flatten.call(neew);
					if (old.length || neew.length) {
						result.sort();
						promise.emit('change', { data: result, old: old, new: neew });
					}
				}