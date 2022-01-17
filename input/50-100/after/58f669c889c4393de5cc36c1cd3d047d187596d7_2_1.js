function (callback) {
			var callback = callback;
			
			core.ajax({
				url: "https://api.stackexchange.com/2.0/users/366313?site=stackoverflow",
				type: "GET",
				dataType: "jsonp",
				contentType: "application/javascript",
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