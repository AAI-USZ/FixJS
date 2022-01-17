function(elem, info) {
				elem.src = info.image.links.original;
				elem.href = info.image.links.original;
				if (RESUtils.pageType() == 'linklist') {
					$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				}
				elem.type = 'IMAGE';
				if (info.image.image.caption) elem.caption = info.image.image.caption;
				modules['showImages'].createImageExpando(elem);
			}