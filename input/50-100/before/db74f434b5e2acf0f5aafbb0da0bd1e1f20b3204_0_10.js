function(elem, info) {
					elem.type = 'IMAGE';
					elem.src = info;
					elem.href = info;
					$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
					modules['showImages'].createImageExpando(elem);
			}