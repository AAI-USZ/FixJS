function( jsonData, context ) {

			var next = null;
			var prev = null;
			var title = null;
			var img = null;

			if (jsonData.query.count > 0) {

				if (jsonData.query.results["a"]) {
					if (jsonData.query.results["a"].length) {
						prev = jsonData.query.results["a"][0].href;
						next = jsonData.query.results["a"][1].href;
					} else {
						//On single URL check whether it's previous or next link
						//TODO: Generalize this code so that it can work with other comics.
						var isPrev = jsonData.query.results["a"].rel === "prev";
						if (this.params.opt && this.params.opt.getLinkIsPrev) {
							isPrev = this.params.opt.getLinkIsPrev( jsonData.query.results["a"], jsonData, context.URL, context.comic );
						}
						if (isPrev) {
							prev = jsonData.query.results["a"].href
						} else {
							next = jsonData.query.results["a"].href
						}
					}
				}
				
				//Prepender
				if (prev && prev.length < this.params["URL"].length) prev = this.params["URL"] + prev;
				if (next && next.length < this.params["URL"].length) next = this.params["URL"] + next;
	
				title = jsonData.query.results.img.alt;
		
				//To facilitate somewhat more 'rough' xpath results, checking for image array
				//and picking only the first
		
				if (jsonData.query.results["img"].length) {
					img = jsonData.query.results.img[0].src
				} else {
					img = jsonData.query.results.img.src;
				}

			}
			
			return new domain.Entry({
				"title":title,
				"imgURL":img,
				"currentURL":context.URL,
				"prevURL":prev,
				"nextURL":next,
				"comic":context.comic
			});

		}