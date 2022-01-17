function (e, widthChange) {
		if (mobileDevice) {
			return;
		}

		var content, contentWidth,
			sidebar = $('#sidebar'),
			top = $(window).scrollTop();

		if (typeof widthChange !== 'boolean') {
			widthChange = false;
		}

		if (top > 100) {
			if (!sidebar.hasClass('sidebarfixed') || widthChange) {
				content = $('#content');
				contentWidth = parseInt(content.css('width'), 10);

				sidebar.addClass('sidebarfixed')
					.css('width', contentWidth / 3 - 11)
					.css('left', content.offset().left + contentWidth + 11);
			}
		} else {
			sidebar.removeClass('sidebarfixed');
		}
	}