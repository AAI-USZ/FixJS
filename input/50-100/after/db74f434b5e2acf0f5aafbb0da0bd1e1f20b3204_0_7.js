function(elem, info) {
				elem.type = 'IMAGE';
				// we don't overwrite the URL here since this is a deferred/scraped call.
				// elem.href = info.src;
				if (RESUtils.pageType() == 'linklist') {
					$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				}
				elem.src = info.src;
				modules['showImages'].revealImageDeferred(elem);
			}