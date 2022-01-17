function(port, data) {
				wot.core.loadratings(data.targets, function(hosts) {
					var ratings = {};

					hosts.forEach(function(target) {
						var obj = wot.cache.get(target) || {};

						if (obj.status == wot.cachestatus.ok ||
							obj.status == wot.cachestatus.link) {
							ratings[target] = obj.value;
						}
					});

					port.post("update", { rule: data.rule, ratings: ratings });
				});
			}