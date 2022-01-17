function(elem, url, selector, handler) {
		GM_xmlhttpRequest({
			method:	"GET",
			url:	url,
			onload:	function(response) {
				var thisHTML = response.responseText;
				var tempDiv = document.createElement('div');
				tempDiv.innerHTML = thisHTML;
				var scrapedImg = tempDiv.querySelector(selector);
				if (typeof(handler) == 'function') {
					scrapedImg = handler(scrapedImg);
				}
				// just in case the site (i.e. flickr) has an onload, kill it to avoid JS errors.
//				if (!scrapedImg) return;
				if (scrapedImg) {
					scrapedImg.onload = '';

					modules['showImages'].siteModules[elem.site].handleInfo(elem, {
						src: scrapedImg.src
					});
				} else {
					// uh oh, scraping failed.
					console.log(tempDiv);
				}
			}
		});

	}