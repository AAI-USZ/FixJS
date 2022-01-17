function(i){
					var thisLi = $('<li><span>'+o.labelFilter(this)+'</span></li>').prependTo(ylabelsUL);

					var label = thisLi.find('span:not(.line)').addClass('label');

					if (horizontal) {
						/**
						 * For left labels, we want to vertically align the text
						 * to the middle of its container, but we don't know how
						 * many lines of text we will have, since the labels could
						 * be very long.
						 *
						 * So we set a min-height of liBottom, and a max-height
						 * of liBottom + 1, so we can then check the label's actual
						 * height to determine if it spans one line or more lines.
						 */
						label.css({
							'min-height': liBottom,
							'max-height': liBottom + 1,
							'vertical-align': 'middle'
						});
						thisLi.css({'top': liBottom * i, 'min-height': liBottom});

						r = label[0].getClientRects()[0];
						if (r.bottom - r.top == liBottom) {
							/* This means we have only one line of text; hence
							 * we can centre the text vertically by setting the line-height,
							 * as described at:
							 *   http://www.ampsoft.net/webdesign-l/vertical-aligned-nav-list.html
							 *
							 * (Although firefox has .height on the rectangle, IE doesn't,
							 * so we use r.bottom - r.top rather than r.height.)
							 */
							label.css('line-height', parseInt(liBottom) + 'px');
						}
						else {
							/*
							 * If there is more than one line of text, then we shouldn't
							 * touch the line height, but we should make sure the text
							 * doesn't overflow the container.
							 */
							label.css("overflow", "hidden");
						}
					}
					else {
						thisLi.css('bottom', liBottom * i).prepend('<span class="line" />');
						label.css('margin-top', -label.height() / 2)
					}
				}