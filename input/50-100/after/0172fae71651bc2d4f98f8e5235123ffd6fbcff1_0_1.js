function(){
					if (!elm.hasClass('ui-scrollfix') && window.pageYOffset > attrs.uiScrollfix) {
						elm.addClass('ui-scrollfix');
					} else if (elm.hasClass('ui-scrollfix') && window.pageYOffset < attrs.uiScrollfix) {
						elm.removeClass('ui-scrollfix');
					}
				}