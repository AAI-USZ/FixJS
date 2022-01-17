function () {
		var url = location.pathname,

		// Timestamp needs / 1000 as it is in ns, while server wants ms
			data = {timestamp: Math.round(time / 1000)};

		$.get(url, data, function (newArticles) {
			// newArticles can equal "Invalid time", check for that
			if ($.isArray(newArticles) && newArticles.length) {
				articles = articles.concat(newArticles);

				link.find('p')
					.text(articles.length + ' new articles available');

				if (link.is(':hidden')) {
					link.slideDown();
				}
			}

			time = Date.now();
		});
	}