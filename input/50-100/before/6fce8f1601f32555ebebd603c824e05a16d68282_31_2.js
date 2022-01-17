function createAjaxRequestSettings(settings, urlPath) {
			var url = settings.url;
			if (!endsWith(url, '/')) url += '/';
			url += 'rest/api/latest/' + urlPath;
			return {
				url: url,
				username: settings.username,
				password: settings.password
			};
		}