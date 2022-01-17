function(elem, info) {
				elem.type = info.type;
				elem.src = info.src;
				elem.href = info.src;
				$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				modules['showImages'].createImageExpando(elem);
			}