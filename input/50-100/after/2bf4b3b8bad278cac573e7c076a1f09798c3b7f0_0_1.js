function () {
			width = $(document).width();
			height = $(document).height();
			headerHeight = $("header", $.mobile.activePage).height();
			footerHeight = $("footer", $.mobile.activePage).height();
			contentHeight = height - headerHeight - footerHeight;
		}