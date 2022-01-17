function(i, url) {
			$.ajax({
				url : url,
				success : function (data) {
					schemas.push(data);
					urlsGot++;
					if (urlsGot === includeSchemaURLs.length + 1) {
						init();
					}
				},
				error : function () {
					throw new Error("Couldn't fetch sub schema from: " + url);
				}
			});
		}