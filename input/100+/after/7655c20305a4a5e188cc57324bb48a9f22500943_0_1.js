function (res) {
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
			}