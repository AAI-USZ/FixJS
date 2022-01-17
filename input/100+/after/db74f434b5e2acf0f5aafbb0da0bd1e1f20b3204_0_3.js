function(elem, info) {
				//TODO: Handle titles
				//TODO: Handle possibility of flash items
				if ('ITEMS_GALLERY' in info) {
					if (info.ITEMS_GALLERY.length > 1) {
						elem.type = 'GALLERY';
						elem.src = {
							src: info.ITEMS_GALLERY
						};
					} else {
						elem.type = 'IMAGE';
						elem.href = info.ITEMS_GALLERY[0];
						if (RESUtils.pageType() == 'linklist') {
							$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
						}
						elem.src = info.ITEMS_GALLERY[0];
					}
					modules['showImages'].createImageExpando(elem);
				}
			}