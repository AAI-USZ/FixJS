function(ph) {
			ph.createPage(function(page) {
				return page.open(url, function (status) {
					if (status !== 'success') {
						cb('Error opening ' + url + ': ' + status, false);
					} else {
						page.injectJs('./jquery.js', function() {
							cb(null, ph, page);
						});
					}
				});
			});
		}