function () {
			var newSettings = {
				name: activeSettings.name,
				baseUrl: 'bamboo',
				url: $('.url-input').val(),
				updateInterval: parseInt($('.update-interval-input').val(), 10),
				username: $('.username-input').val(),
				password: $('.password-input').val(),
				plans: projectView.get().projects
			};
			return newSettings;
		}