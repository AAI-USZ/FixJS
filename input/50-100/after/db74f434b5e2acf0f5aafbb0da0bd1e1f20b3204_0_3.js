function(elem, info) {
				elem.type = 'IMAGE';
				elem.src = info.src;
				elem.href = info.src;
				if (RESUtils.pageType() == 'linklist') {
					$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				}
				modules['showImages'].createImageExpando(elem);
			}