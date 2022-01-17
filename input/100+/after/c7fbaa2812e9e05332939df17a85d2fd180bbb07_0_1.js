function() {
		var d = $.Deferred();
		if(this.token) {
			d.resolve(this.token);
			return d.promise();
		} 
		var that = this;
		that.request('GET',  {
			action: 'query',
			prop: 'info',
			intoken: 'edit',
			// HACK: for Samsung Galaxy S
			titles: 'Bohemian Rhapsody' + Math.random()
		}).done(function(data) {
			var token;
			$.each(data.query.pages, function(i, item) {
				token = item.edittoken;
			});
			if (token) {
				that.token = token;
				d.resolve(token);
			} else {
				d.reject("No token found");
			}
		}).fail(function(err) {
			d.reject(err);
		});
		return d.promise();
	}