function (scope) {
			var r = $.Deferred();
			if (scope.resolved) {
				r.resolve(scope.resolved);
			} else {
				console.log("GET PROPERTIES: " + scope.object.objectId);
				Inspector.Runtime.getProperties(scope.object.objectId, true, function (res) {
					scope.resolved = {};
					for (var i in res.result) {
						var info = res.result[i];
						scope.resolved[info.name] = info.value;
					}
					r.resolve(scope.resolved);
				});
			}
			return r.promise();
		}