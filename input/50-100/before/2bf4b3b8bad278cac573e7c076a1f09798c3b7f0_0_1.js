function () {
			width = $(window).width();
			height = $(window).height();
			headerHeight = $("header", $.mobile.activePage).height();
			footerHeight = $("footer", $.mobile.activePage).height();
			contentHeight = height - headerHeight - footerHeight;
		}