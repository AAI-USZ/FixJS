function discoverResources(resourceData,queueItem) {
		var resources = [], resourceText = resourceData.toString("utf8");

		// Clean links
		function cleanAndQueue(urlMatch) {
			if (urlMatch) {
				urlMatch.forEach(function(URL) {
					URL = URL.replace(/^(\s?href|\s?src)=['"]?/i,"").replace(/^\s*/,"");
					URL = URL.replace(/^url\(['"]*/i,"");
					URL = URL.replace(/^javascript\:[a-z0-9]+\(['"]/i,"");
					URL = URL.replace(/["'\)]$/i,"");
					URL = URL.split(/\s+/g).shift();

					if (URL.match(/^\s*#/)) {
						// Bookmark URL
						return false;
					}

					URL = URL.split("#").shift();

					if (URL.replace(/\s+/,"").length && protocolSupported(URL)) {
						if (!resources.reduce(function(prev,current) {
								return prev || current === URL;
							},false)) {

							resources.push(URL);
						}
					}
				});
			}
		}

		// Rough scan for URLs
		cleanAndQueue(resourceText.match(/(\shref\s?=\s?|\ssrc\s?=\s?|url\()['"]?([^"'\s>\)]+)/ig));
		cleanAndQueue(resourceText.match(/http(s)?\:\/\/[^?\s><\'\"]+/ig));
		cleanAndQueue(resourceText.match(/url\([^)]+/ig));

		// This might be a bit of a gamble... but get hard-coded strings out of javacript: URLs
		// They're often popup-image or preview windows, which would otherwise be unavailable to us
		cleanAndQueue(resourceText.match(/^javascript\:[a-z0-9]+\(['"][^'"\s]+/ig));
		
		return resources;
	}