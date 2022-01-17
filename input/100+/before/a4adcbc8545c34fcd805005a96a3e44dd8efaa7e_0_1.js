function showPage( pageName, deferred ) {
		addToHistory( pageName );
		var $page = $("#" + pageName); 
		$('.page, .popup-container-container').hide(); // hide existing popups
		if(!$page.hasClass('popup-container-container')) {
			curPageName = pageName;
		}
		$page.show();
		$( 'select', $page ).val( '' ); // reset to the top item in the list
		if( deferred ) {
			$page.addClass( 'loading' );
			// TODO: add fail e.g. warning triangle
			deferred.done( function() {
				$page.removeClass( 'loading' );
			} );
		}
		// special casing for specific pages
		var monuments = $( "#results" ).data( 'monuments' );
		if( monuments && pageName === 'results-page' ) {
				showMonumentsList( monuments );
		} else if( monuments && pageName === 'map-page' ) {
			showMonumentsMap( monuments );
		} else if( pageName === 'country-page' ) { // force a refresh of the map on visiting the country page
			mapFocusNeeded = true;
		}
	}