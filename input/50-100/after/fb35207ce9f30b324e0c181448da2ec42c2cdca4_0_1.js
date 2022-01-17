function (json) {
		var templateJson = createModel(json),
			html = planSelectionTemplate(templateJson);
		rootElement.html(html);
		rootElement.collapse({ toggle: false});
		rootElement.find('.project-item input:checked').each(function () {
			$(this).closest('.collapse').addClass('in');
		});
		rootElement.show();
	}