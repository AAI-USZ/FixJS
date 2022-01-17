function(event) {
		event.stopPropagation();
		event.preventDefault();

		// If only one plugin is visible in search results, jump to the detail view and select it.
		if (1 === $('div.current a:visible').size() && 'detail' !== $('#post-body-content > .current').prop('class').trim() && 'list' !== $('#post-body-content > .current').prop('class').trim()) {
			var new_plugin = $('#post-body-content > .grid a:visible img');

			$('#dpa-toolbar-search').val('');
			// @todo Reimplement - maybe let form submission through?
		}
	}