function( jsonLinks, context ) {
			
			var prev, next,
				isPrevLink = (this.params.opt && this.params.opt.getLinkIsPrev)?this.params.opt.getLinkIsPrev:null;

			if ( jsonLinks ) {

				if (jsonLinks.length) {

					if (isPrevLink && isPrevLink( jsonLinks[1], context.URL, context.comic ) ) {
						prev = jsonLinks[1].href;
						next = jsonLinks[0].href;
					} else {
						prev = jsonLinks[0].href;
						next = jsonLinks[1].href;
					}

				} else {

					//On single URL check whether it's previous or next link
					//TODO: Generalize this code so that it can work with other comics.
					var isPrev = jsonLinks.rel === "prev";
					if (isPrevLink) {
						isPrev = isPrevLink( jsonLinks, context.URL, context.comic );
					}
					if (isPrev) {
						prev = jsonLinks.href
					} else {
						next = jsonLinks.href
					}

				}

			}
			
			return { prev: prev, next: next };

		}