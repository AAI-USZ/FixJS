function (linkElement) {
		var serviceLink = $(linkElement);
		if (serviceLink.hasClass('active')) {
			return;
		}
		$('#service-list li').removeClass('active');
		serviceLink.addClass('active');
		itemSelected.dispatch(linkElement);
	}