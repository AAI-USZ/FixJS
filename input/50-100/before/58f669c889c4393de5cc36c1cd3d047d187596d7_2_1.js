function (callback) {
			var callback = callback;
			
			core.ajax({
				url: "https://api.stackexchange.com/docs/users-by-ids#order=desc&sort=reputation&ids=366313&filter=default&site=stackoverflow&run=true",
				type: "GET",
				success: function (data) {
					if (callback) callback(data);
				},
				error: function () {
					core.ajax({
						url: "static/stack_overflow_profile.json",
						type: "GET",
						success: function (data) {
							if (callback) callback(data);
						}
					});
				}
			});
		}