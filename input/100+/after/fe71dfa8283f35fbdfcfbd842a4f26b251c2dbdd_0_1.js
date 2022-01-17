function hookQuickSearch() {
	$('.quicksearch-field').each( function() {
		var searchElems = $(this).parents('.section').find( 'li' );
		var toggle = $(this).parents('.section').find('h3 .search-toggle');
		// console.debug( "Toggle is: %o", toggle );
		var qsbox = $(this).parents('form').get( 0 );

		$(this).quicksearch( this, searchElems, {
			noSearchResultsIndicator: 'no-class-search-results',
			focusOnLoad: false
		});
		$(toggle).click( function() {
			// console.debug( "Toggling qsbox: %o", qsbox );
			$(qsbox).toggle();
		});
	});
}