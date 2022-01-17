function(data) {
				schemas.push(data);
				urlsGot++;
				if (urlsGot === includeSchemaURLs.length + 1) {
					init();
				}
			}