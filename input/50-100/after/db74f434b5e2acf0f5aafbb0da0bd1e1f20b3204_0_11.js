function(elem, info) {
				elem.type = 'IMAGE';
				elem.src = info;
				elem.href = info;
				if (RESUtils.pageType() == 'linklist') {
					$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				}
				modules['showImages'].createImageExpando(elem);
			}