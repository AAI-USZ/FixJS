function (_citation) {
		citation = _citation;
		updateReferenceList();

		// list references
		dialog.dialog({
			title : 'Edit Citation ' + (citation + 1),
			width : "700px"
		});

		if (!initialised) {
			advanced.accordion({
				collapsible : true,
				active : false
			});
			initialised = true;
		}
	}