function(title, lang) {
		// Make sure changes to this are also propogated to getAPIUrl
		return app.makeAPIRequest({
			action: 'mobileview',
			page: title,
			redirects: 'yes',
			prop: 'sections|text',
			sections: 'all',
			sectionprop: 'level|line',
			noheadings: 'yes'
		}, lang, {
			converters: {
				'json wpage': function(data) {
					return Page.fromRawJSON(title, data, lang);
				}
			}
		});	
	}