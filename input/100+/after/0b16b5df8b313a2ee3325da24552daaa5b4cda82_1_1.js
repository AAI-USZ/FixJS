function (res) {
					scope.resolved = {};
					for (var i in res.result) {
						var info = res.result[i];
						scope.resolved[info.name] = info.value;
					}
					r.resolve(scope.resolved);
				}