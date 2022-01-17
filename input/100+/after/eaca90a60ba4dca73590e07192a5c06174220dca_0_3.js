function() {
			var content, contentHeight, footer, header, viewportHeight;
			window.scroll(0, 0);
			var tour_map_page = $('#tour-map-page');
			header = tour_map_page.find(":jqmData(role='header'):visible");
			footer = tour_map_page.find(":jqmData(role='footer'):visible");
			content = tour_map_page.find(":jqmData(role='content'):visible");
			viewportHeight = $(window).height();
			contentHeight = viewportHeight - header.outerHeight() - footer.outerHeight();
			tour_map_page.find(":jqmData(role='content')").first().height(contentHeight);
		}