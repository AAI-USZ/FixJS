function (id, context) {
				var html = $(id).html();
				return _.template(html, context);
			}