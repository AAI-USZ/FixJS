function () {
					// Animation complete.
					if (!opened) {
						elm.hide(); // Hide the widget content if the widget was just closed
						wrapper.find('#slideoutInnerWrapper').css('width', imgHide.width);

						if (pe.ie === 0 || document.documentMode !== undefined) {
							wrapper.addClass('slideoutWrapper');
							wrapper.removeClass('slideoutWrapperRel');
							wrapper.css('width', (imgShow.width + focusOutlineAllowance) + 'px').css('top', $('#wb-main-in').offset().top);
							reposition();
						}
					} else { // Slideout just opened
						if (pe.ie === 7 && document.documentMode === undefined) { // Just true IE7
							elm.find('ul').html(elm.find('ul').html()); // Ugly fix for #4312 (post #11)
						}
					}
					toggleLink.on('click vclick', toggle);
					slideoutClose.on('click vclick', toggle);
				}