function(url, cb) {
		global.log.debug('Opening url ' + url);

		try {
			phantom.create('--load-images=no','--local-to-remote-url-access=no', '--disk-cache=yes',function(ph) {
				ph.createPage(function(page) {
					return page.open(url, function (status) {
						if (status !== 'success') {
							cb(new Error('Error opening ' + url + ': ' + status), false);
						} else {
							page.injectJs('./jquery.js', function() {
								cb(null, ph, page);
							});
						}
					});
				});
			});
		} catch (e) {
			cb(e, null);
		}

	}