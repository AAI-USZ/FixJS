function( link, url, comic ) {
				//No request params means latest comic and link is then always to previous...
				if (url.indexOf("?") < 1) return true;
				
				//Else sort current url versus the link...
				var urls = [url, link.href];
				urls.sort();
				
				//if url does not equal the first link after sort, the link is to previous comic...
				var isPrev = url != urls[0];
				return isPrev;
			}