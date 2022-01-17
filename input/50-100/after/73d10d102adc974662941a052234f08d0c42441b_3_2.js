function (_citation) {
		citation = _citation;
		updateReferenceList();

		// list references
		dialog.dialog({
			title : 'Edit Citation ' + (citation + 1),
			width : 700
		});

		if (!initialised) {
			advanced.accordion({
				collapsible : true,
				active : false
			});
			initialised = true;
		}
		
		if (dialog.height() > $(window).height() - 50) {
			dialog.height($(window).height() - 50);
		}
	}