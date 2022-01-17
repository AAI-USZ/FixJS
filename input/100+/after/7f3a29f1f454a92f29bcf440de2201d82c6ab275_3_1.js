function (callback) {
			var cslData, styleURL, result;
			cslData = get(); 
			
			styleURL = getUrlVar("styleURL");
			console.log("url from url: " + styleURL);

			// try loading style specified in options
			if (typeof CSLEDIT.options.get("initialCslCode") !== "undefined") {
				result = setCslCode(CSLEDIT.options.get("initialCslCode"));
				if (result.hasOwnProperty('error')) {
					alert(result.error);
				} else {
					callback();
					return;
				}
			}
			
			if (styleURL != "" && typeof styleURL !== 'undefined') {
				styleURL = "../getFromOtherWebsite.php?url=" + encodeURIComponent(styleURL);
				
				loadStyleFromURL(styleURL, callback);/*function () {
					// reload page without the styleURL query string, to avoid the user
					// refreshing the page triggering a re-load of the style
					window.location.href = window.location.href.replace(/\?.*$/, "");
				});*/
			} else if (cslData !== null && cslData !== "") {
				callback();
			} else {
				styleURL = CSLEDIT.options.get("rootURL") + "/external/csl-styles/apa.csl";
				loadStyleFromURL(styleURL, callback);
			}
		}