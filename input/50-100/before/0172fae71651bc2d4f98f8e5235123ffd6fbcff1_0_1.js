function(){
					if (!elm.hasClass('fixed') && window.pageYOffset > attrs.uiScrollfix) {
						elm.addClass('fixed');
					} else if (elm.hasClass('fixed') && window.pageYOffset < attrs.uiScrollfix) {
						elm.removeClass('fixed');
					}
				}