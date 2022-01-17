function( link, jsonData, url, comic ) {
				return jsonData.query.results.a.id && jsonData.query.results.a.id.indexOf("prev") >= 0;
			}