function (e) {
				toggleLink.off('click vclick');
				slideoutClose.off('click vclick');

				if (!opened) {
					var position = wrapper.position();
					if (pe.ie === 0 || document.documentMode !== undefined) {
						wrapper.removeClass('slideoutWrapper')
							.addClass('slideoutWrapperRel')
							.css({"top": position.top - $('#wb-core-in').offset().top, "right": borderWidth - 10});
					}
					elm.show(); // Show the widget content if it is about to be opened
					pe.focus(tocLinks.eq(0));
				}

				opened = !opened;
				wrapper.animate({
					width: parseInt(wrapper.css('width'), 10) === (imgShow.width + focusOutlineAllowance) ? elm.outerWidth() + (imgShow.width + focusOutlineAllowance) : (imgShow.width + focusOutlineAllowance) + 'px'
				}, function () {
					// Animation complete.
					if (!opened) {
						elm.hide(); // Hide the widget content if the widget was just closed
						wrapper.find('#slideoutInnerWrapper').css('width', imgHide.width);

						if (pe.ie === 0 || document.documentMode !== undefined) {
							wrapper.addClass('slideoutWrapper');
							wrapper.removeClass('slideoutWrapperRel');
							wrapper.css('width', (imgShow.width + focusOutlineAllowance) + 'px').css('top', $('#wb-core-in').offset().top);
							reposition();
						}
					} else { // Slideout just opened
						if (pe.ie === 7 && document.documentMode === undefined) { // Just true IE7
							elm.find('ul').html(elm.find('ul').html()); // Ugly fix for #4312 (post #11)
						}
					}
					toggleLink.on('click vclick', toggle);
					slideoutClose.on('click vclick', toggle);
				});

				if (opened) {
					wrapper.find('#slideoutToggle a img').attr({'src': imgHide.path,
						'title': imgHide.alt,
						'alt': imgHide.alt});
					wrapper.find('#slideoutToggle a').attr('aria-pressed', 'true');
					elm.attr('aria-hidden', 'false');
					wrapper.find('#slideoutInnerWrapper').css('width', '');
				} else {
					wrapper.find('#slideoutToggle a img').attr({'src': imgShow.path,
						'title': imgShow.alt,
						'alt': imgShow.alt});
					wrapper.find('#slideoutToggle a').attr('aria-pressed', 'false');
					elm.attr('aria-hidden', 'true');
				}

				return false;
			}