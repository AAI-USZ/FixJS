function (e) {
					// Ignore key events within form elements
					if ($.inArray(e.target.tagName.toLowerCase(), ['input', 'textarea', 'select', 'button']) > -1) {
						return;
					}

					if ($.inArray(e.keyCode, keys.close) > -1) {
						F.close();
						e.preventDefault();

					} else if ($.inArray(e.keyCode, keys.next) > -1) {
						F.next();
						e.preventDefault();

					} else if ($.inArray(e.keyCode, keys.prev) > -1) {
						F.prev();
						e.preventDefault();
					}
				}