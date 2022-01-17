function (event) {
			event.preventDefault();
			if ($(event.target).is(".jstree-icon")) { return; }
			onTraceSelected($(event.target).closest('li').data('trace'));
		}