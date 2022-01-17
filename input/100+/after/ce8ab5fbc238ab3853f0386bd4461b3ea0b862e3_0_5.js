function(elem) {
				if (elem.href.indexOf('/sizes') != -1) {
					var selector = '#allsizes-photo > IMG';
					var handler = null;
				} else {
					// var selector = '#photo > .photo-div > IMG';
					var selector = '#photo .photo-div noscript';
					var handler = function(ele) {
						var matches = ele.innerHTML.match(/src=\"([:/\w\.]+)\"/);
						// grab src="... from noscript tag...
						var scrapedImg = null;
						if (matches) {
							scrapedImg = {
								src: matches[1]
							}
						}
						return scrapedImg;

					}
				}
				modules['showImages'].scrapeHTML(elem, elem.href, selector, handler)
			}