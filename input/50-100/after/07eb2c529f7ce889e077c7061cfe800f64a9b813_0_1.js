function () {
							curSlide = slideNum;

							if (nav.length === 1) {
								// Add "selected" class to current navigation item
								var items = NW.Dom.select('.experis-slider > ul li', wrapper.parentNode);

								for (var n = 0, item; item = items[n++];) {
									item.className = item.className.replace(' selected', '');
								}

								items[curSlide - 1].className += ' selected';
							}

							if (mouseStatus === 'out') startSlider();
						}