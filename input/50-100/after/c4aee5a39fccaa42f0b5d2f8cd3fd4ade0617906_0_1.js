function() {
				for(var i=fromPage; i<=toPage; i++) {
					data[i * opts.pagesize] = null; // null indicates a 'requested but not available yet'
				}

				onDataLoading.notify({from:from, to:to});

				req = $.jsonp({
					url: url,
					callbackParameter: "callback",
					cache: true,
					success: onSuccess,
					error: function() {
						onError(fromPage, toPage)
					}
				});
				req.fromPage = fromPage;
				req.toPage = toPage;
			}