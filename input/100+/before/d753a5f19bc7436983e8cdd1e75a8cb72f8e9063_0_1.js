function dpa_update_filters(event, sss, ddd) {
	event.preventDefault();
	event.stopImmediatePropagation();

	// Get current filter and search query
	var current_filter   = $('#dpa-toolbar-filter').val(),
	current_search_query = $('#dpa-toolbar-search').val(),
	item                 = null,
	object               = '',

	// Find out what view we're in. This controls what we need to search for in the DOM.
	current_view = $('#post-body-content > .current').prop('class');
	if (current_view.indexOf('grid') >= 0) {
		current_view = 'grid';
		object       = '#post-body-content > .grid a';

	} else if (current_view.indexOf('list') >= 0) {
		current_view = 'list';
		object       = '#post-body-content > .list tbody tr';

	} else if (current_view.indexOf('detail') >= 0) {
		current_view = 'detail';
		object       = '#post-body-content > .detail > ul li';
	}

	// Go through the DOM elements and figure out filter visibility
	$(object).each(function() {
		item = $(this);

		// Show installed plugins
		if ("1" === current_filter) {
			if (item.hasClass('installed')) {
				item.addClass('showme');
			} else {
				item.addClass('hideme');
			}

		// Show available plugins
		} else if ("0" === current_filter) {
			if (item.hasClass('notinstalled')) {
				item.addClass('showme');
			} else {
				item.addClass('hideme');
			}

		// Show all
		} else {
			item.addClass('showme');
		}
	});

	// Now, go through the DOM elements and figure out search query visibilty (hideme trumps showme).
	$(object + ':not(.hideme)').each(function() {
		item = $(this);

		// Grid view - searches on 'alt' tags
		if ('grid' === current_view && item.children('img').prop('alt').search(new RegExp(current_search_query, 'i')) < 0 ||

		// List view - searches on plugin name column
		'list' === current_view && item.children('.name').text().search(new RegExp(current_search_query, 'i')) < 0 ||

		// Detail view - search on the LI classes.
		'detail' === current_view && item.prop('class').search(new RegExp(current_search_query, 'i')) < 0) {

			// No match
			item.removeClass('showme');
			item.addClass('hideme');
		}
	});

	// Finally, go through everything one last time and show/hide as appropriate
	$(object).each(function() {
		item = $(this);

		if (item.hasClass('showme')) {
			item.show();
		} else if ( item.hasClass('hideme')) {
			item.hide();
		}

		// Reset the visibility markers for future iterations
		item.removeClass('hideme').removeClass('showme');
	});
}