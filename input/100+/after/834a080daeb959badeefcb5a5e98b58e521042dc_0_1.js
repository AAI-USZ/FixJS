function() {
					var front_page_image = $('#front-page #feature-wrap img'),
						window_width     = $(window).width(),
						window_height    = $(window).height();
					
					if(ie7) {
						window_height = window_height * 1.5; // why? who knows
					}
					if (!null(iphone) || !null(ipod)) {
						window_height = window_height + 400
					}
					

					var aspect_ratio = front_page_image.width() / front_page_image.height();

					var target_width = Math.round(window_height * aspect_ratio);
					
					front_page_image.width((window_width > target_width ? window_width : target_width));
					

					center_browser_support();
				}