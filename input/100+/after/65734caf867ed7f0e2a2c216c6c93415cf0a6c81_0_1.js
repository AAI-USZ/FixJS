function (index) {
			var element = F.group[index] || null,
				coming = $.extend(true, {}, F.opts, element, (element && $.metadata ? $(element).metadata() : {})),
				isDom = false,
				rez = false,
				href,
				type;

			coming.index = index;
			coming.element = element;

			// Convert margin property to array - top, right, bottom, left
			if (typeof coming.margin === 'number') {
				coming.margin = [coming.margin, coming.margin, coming.margin, coming.margin];
			}

			//Give a chance for callback or helpers to update item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;
				return;

			} else {
				coming = F.coming;
			}

			type = coming.type;
			href = coming.href;

			//Check if content type is set, if not, try to get
			if (!type) {
				//If custom content exists than use it as element
				if (coming.content) {
					element = coming.content;
				}

				//If element is object than we can detect if it is DOM element and get source path, if not - maybe it`s href
				if (typeof element === 'object') {
					isDom = (element.nodeType || element instanceof $);
					href = $(element).attr('href') || null;

				} else {
					href = element;
				}

				//If we have source path we can use it to load content ... 
				if (href) {
					if (isDom) {
						rez = $(element).data('fancybox-type');

						if (!rez && element.className) {
							rez = element.className.match(/fancybox\.(\w+)/);
							rez = rez ? rez[1] : false;
						}
					}

					if (rez) {
						type = rez;

					} else if (F.isImage(href)) {
						type = 'image';

					} else if (F.isSWF(href)) {
						type = 'swf';

					} else if (href.match(/^#/)) {
						type = 'inline';

					} else {
						coming.content = href;
					}

					if (type === 'inline') {
						coming.content = $(href);
					}
				}

				if (!type) {
					// ...if not - we can display given DOM element itself ..
					if (isDom) {
						type = 'inline';
						coming.content = element;

						// .. or assume that we have HTML 
					} else if (coming.content) {
						type = 'html';
					}
				}

				coming.type = type;
				coming.href = href;
			}

			F.coming = coming;

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type) {
				F._afterLoad();

			} else {
				return F._error();
			}
		}