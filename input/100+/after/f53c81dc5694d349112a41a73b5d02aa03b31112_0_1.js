function setMinHeight() {

			$('#content').css('min-height',
				$(window).outerHeight(true)
				- ( $('body').outerHeight(true)
				- $('body').height() )
				- $('#header').outerHeight(true)
				- ( $('#content').outerHeight(true) - $('#content').height() )
				+ ( $('.page-title').length ? Math.abs( parseInt( $('.page-title').css('margin-top') ) ) : 0 )
				- $('#footer').outerHeight(true)
				- $('#footer-bottom').outerHeight(true)
			);
		
		}