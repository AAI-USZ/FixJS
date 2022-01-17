function() {
			var content, contentHeight, footer, header, viewportHeight;
			window.scroll(0, 0);
			header = $(":jqmData(role='header'):visible");
			footer = $(":jqmData(role='footer'):visible");
			content = $(":jqmData(role='content'):visible");
			viewportHeight = $(window).height();
			contentHeight = viewportHeight - header.outerHeight() - footer.outerHeight();
			$(":jqmData(role='content')").first().height(contentHeight);
			return $("#tour-map").height(contentHeight);
		}