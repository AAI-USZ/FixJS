function makeAPIRequest(params, lang, extraOptions) {
		params = params || {};
		params.format = 'json'; // Force JSON
		lang = lang || preferencesDB.get('language');
		var url = app.baseUrlForLanguage(lang) + '/w/api.php';
		var defaultOptions = {
			url: url,
			data: params,
			// Making this 'text' and parsing the JSON ourselves makes things much easier
			// Than making it as 'JSON' for pre-processing via dataFilter
			// See https://forum.jquery.com/topic/datafilter-function-and-json-string-result-problems
			dataType: 'jsonp wpage',
			converters: {
				'json wpage': function(text) {
					if (typeof(text) === 'string')
						return JSON.parse(text);
					else
						return text;
				}
			}
		};
		var options = $.extend(defaultOptions, extraOptions);
		return $.ajax(options);
	}