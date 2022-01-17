function showPage( pageName, deferred ) {
		addToHistory( pageName );
		var $page = $("#" + pageName); 
		$('.page, .popup-container-container').hide(); // hide existing popups
		if(!$page.hasClass('popup-container-container')) {
			curPageName = pageName;
		}
		$page.show();
		if( deferred ) {
			$page.addClass( 'loading' );
			// TODO: add fail e.g. warning triangle
			deferred.done( function() {
				$page.removeClass( 'loading' );
			} );
		}
	}