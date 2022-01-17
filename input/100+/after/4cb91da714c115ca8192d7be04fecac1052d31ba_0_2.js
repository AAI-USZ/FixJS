function (res) {
					var pending = [];
					var resolved = value.value = {};

					var used = 0;
					for (var i = 0; i < res.result.length; i++) {
						var info = res.result[i];
						if (! info.enumerable) { continue; }
						if (++used > maxChildren) {
							resolved[""] = { special: "abbreviated" };
							break;
						}
						resolved[info.name] = info.value;
						pending.push(resolveVariable(info.value, cache, depth + 1));
					}

					$.when.apply(null, pending).done(function () {
						result.resolve(value);
					});
				}