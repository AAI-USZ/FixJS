function(data) {
			mainSchemaData = data;
			urlsGot++;
			if (urlsGot === includeSchemaURLs.length + 1) {
				init();
			}
		}