function resolveVariable(value, cache) {
		if (! cache) { cache = {}; }
		
		var result = new $.Deferred();
		
		if (! value.objectId) {
			result.resolve(value);
		}
		else if (cache[value.objectId]) {
			result.resolve(cache[value.objectId]);
		}
		else {
			cache[value.objectId] = value;
			if (value.type === "function") {
				Inspector.Debugger.getFunctionDetails(value.objectId, function (res) {
					value.details = res.details;
					result.resolve(value);
				});
			}
			else {
				Inspector.Runtime.getProperties(value.objectId, true, function (res) {
					var pending = [];
					var resolved = value.value = {};
					for (var i in res.result) {
						var info = res.result[i];
						if (! info.enumerable) { continue; }
						resolved[info.name] = info.value;
						pending.push(resolveVariable(info.value));
					}

					$.when.apply(null, pending).done(function () {
						result.resolve(value);
					});
				});
			}
		}

		return result.promise();
	}