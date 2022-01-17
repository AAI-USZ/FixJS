function(elem, url, selector) {
		GM_xmlhttpRequest({
			method:	"GET",
			url:	url,
			onload:	function(response) {
				var thisHTML = response.responseText;
				var tempDiv = document.createElement('div');
				tempDiv.innerHTML = thisHTML;
				var scrapedImg = tempDiv.querySelector(selector);
				// just in case the site (i.e. flickr) has an onload, kill it to avoid JS errors.
//				if (!scrapedImg) return;
				scrapedImg.onload = '';

				modules['showImages'].siteModules[elem.site].handleInfo(elem, {
					src: scrapedImg.src
				});
			}
		});

	}