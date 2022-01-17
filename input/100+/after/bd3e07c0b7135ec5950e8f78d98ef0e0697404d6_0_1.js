function(elm) {
				var value;

				switch (elm.nodeName) {
					case 'TABLE':
						cls = settings.visual_table_class || 'mceItemTable';
						value = dom.getAttrib(elm, 'border');

						if (!value || value == '0') {
							if (self.hasVisual)
								dom.addClass(elm, cls);
							else
								dom.removeClass(elm, cls);
						}

						return;

					case 'A':
						if (!elm.href) {
							value = dom.getAttrib(elm, 'name') || elm.id;
							cls = 'mceItemAnchor';

							if (value) {
								if (self.hasVisual)
									dom.addClass(elm, cls);
								else
									dom.removeClass(elm, cls);
							}
						}

						return;
				}
			}