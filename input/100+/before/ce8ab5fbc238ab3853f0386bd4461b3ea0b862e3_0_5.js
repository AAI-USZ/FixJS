function(elem) {
				if (elem.href.indexOf('/sizes') != -1) {
					var selector = '#allsizes-photo > IMG';
				} else {
					var selector = '#photo > .photo-div > IMG';
				}
				modules['showImages'].scrapeHTML(elem, elem.href, selector)
			}