function (e) {
					if (e.type === "keydown") {
						if (!(e.ctrlKey || e.altKey || e.metaKey)) {
							switch (e.keyCode) {
							case 9: // tab key (close the popup)
								$popup.trigger("close");
								return false;
							case 27: // escape key (close the popup)
								$popup.trigger("close");
								return false;
							case 37: // left arrow (go on link left, or to the right-most link in the previous row, or to the right-most link in the last row)
								target = $(e.target).closest('li').prev().find('a');
								if (target.length === 0) {
									target = $popupLinks;
								}
								pe.focus(target.last());
								return false;
							case 38: // up arrow (go one link up, or to the bottom-most link in the previous column, or to the bottom-most link of the last column)
								leftoffset = $(e.target).offset().left;
								target = $(e.target).closest('li').prevAll().find('a').filter(function (index) {
									return ($(this).offset().left === leftoffset);
								});
								if (target.length > 0) {
									pe.focus(target.first());
								} else {
									target = $popupLinks.filter(function (index) {
										return ($(this).offset().left < leftoffset);
									});
									if (target.length > 0) {
										pe.focus(target.last());
									} else {
										leftoffset = $popupLinks.last().offset().left;
										target = $popupLinks.filter(function (index) {
											return ($(this).offset().left > leftoffset);
										});
										if (target.length > 0) {
											pe.focus(target.last());
										} else {
											pe.focus($popupLinks.last());
										}
									}
								}
								return false;
							case 39: // right arrow (go one link right, or to the left-most link in the next row, or to the left-most link in the first row)
								target = $(e.target).closest('li').next().find('a');
								if (target.length === 0) {
									target = $popupLinks;
								}
								pe.focus(target.first());
								return false;
							case 40: // down arrow (go one link down, or to the top-most link in the next column, or to the top-most link of the first column)
								leftoffset = $(e.target).offset().left;
								target = $(e.target).closest('li').nextAll().find('a').filter(function (index) {
									return ($(this).offset().left === leftoffset);
								});
								if (target.length > 0) {
									pe.focus(target.first());
								} else {
									target = $popupLinks.filter(function (index) {
										return ($(this).offset().left > leftoffset);
									});
									if (target.length > 0) {
										pe.focus(target.first());
									} else {
										pe.focus($popupLinks.first());
									}
								}
								return false;
							default:
								// 0 - 9 and a - z keys (go to the next link that starts with that key)
								if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 64 && e.keyCode < 91)) {
									keychar = String.fromCharCode(e.keyCode).toLowerCase();
									elmtext = $(e.target).text();
									matches = $popupLinks.filter(function (index) {
										return ($(this).text().substring(1, 2).toLowerCase() === keychar || $(this).text() === elmtext);
									});
									if (matches.length > 0) {
										if ($(e.target).hasClass('bookmark_popup_text')) {
											pe.focus(matches.eq(0));
										} else {
											matches.each(function (index) {
												if ($(this).text() === elmtext) {
													match = index;
													return false;
												}
											});
											if (match < (matches.length - 1)) {
												pe.focus(matches.eq(match + 1));
												return false;
											}
											pe.focus(matches.eq(0));
										}
									}
									return false;
								}
							}
						}
					} else if (e.type === "open") { // Open the popup menu an put the focus on the first link
						$popupText.text(opts.hideText + opts.popupText).attr('aria-pressed', 'true');
						pe.focus($popup.show().attr('aria-hidden', 'false').find('li a').first());
					} else if (e.type === "close") { // Close the popup menu and put the focus on the popup link
						pe.focus($popupText.text(opts.popupText).attr('aria-pressed', 'false').first());
						$popup.hide().attr('aria-hidden', 'true');
					}
				}