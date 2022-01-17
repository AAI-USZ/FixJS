function() {
					var front_page_image 	 = $('#front-page #feature-wrap img'),
						front_page_image_src = front_page_image.attr('src');
						window_width     	 = $(window).width(),
						window_height    	 = $(window).height();
					if(ie7) {
						window_height = window_height * 1.5; // why? who knows
					}					

					var aspect_ratio = front_page_image.width() / front_page_image.height();

					var target_width = Math.round(window_height * aspect_ratio);
					
					if ($(window).width() <= 480) {
						$('#feature-wrap').hide();
						$('body').css({'background-image' : 'url('+front_page_image_src+')'});
					}
					else {
						if ($('#feature-wrap').is(":hidden")) {
							$('#feature-wrap').css('display', 'table');
							$('body').css('background-image', 'none');
						}
						front_page_image.width((window_width > target_width ? window_width : target_width));
					}

					center_browser_support();
				}