function() {
			var ie7 = false,
				ipad = (navigator.userAgent.match(/iPad/i) != null);

			if($.browser.msie && $.browser.version == '7.0') {
				ie7 = true
			}

			// UCF Header Bar Links
			$('#UCFHBHeader a').removeClass('external');

			// Browser Support
			var browser_support = $('#browser_support'),
				browser_version = parseFloat($.browser.version);
			var browser_support_text = browser_support.text();

			function center_browser_support() {
				browser_support
					.css("left", (($(window).width() - browser_support.outerWidth()) / 2) + $(window).scrollLeft() + "px");

			}
			center_browser_support();
			if($.browser.msie && browser_version < 7) {
				browser_support.show();
				browser_support.text(browser_support_text.replace('!BROWSER!', 'Internet Explorer ' + browser_version));
			} else if($.browser.opera) {
				browser_support.show();
				browser_support.text(browser_support_text.replace('!BROWSER!', 'Opera ' + browser_version));
			} else if($.browser.webkit && !$.browser.safari && browser_version < 15) {
				browser_support.show();
				browser_support.text(browser_support_text.replace('!BROWSER!', 'Chrome ' + browser_version));
			} else if($.browser.mozilla && browser_version < 8) {
				browser_support.show()
				browser_support.text(browser_support_text.replace('!BROWSER!', 'Firefox ' + browser_version));
			} else if($.browser.safari && browser_version < 5) {
				browser_support.show();
				browser_support.text(browser_support_text.replace('!BROWSER!', 'Safari ' + browser_version));
			}

			// Front Page Image Scaling
			// Adapted from polanski.co
			$(window)
				.resize(function() {
					var front_page_image = $('#front-page #feature-wrap img'),
						window_width     = $(window).width(),
						window_height    = $(window).height();
					
					if(ie7) {
						window_height = window_height * 1.5; // why? who knows
					}

					var aspect_ratio = front_page_image.width() / front_page_image.height();

					var target_width = Math.round(window_height * aspect_ratio);

					front_page_image.width((window_width > target_width ? window_width : target_width));

					center_browser_support();
				})
				.load(function() { 
					// $(window).load waits for the images to be ready
					// but $(document).load does not
					// If the image isn't all the way loaded, jQuery
					// will report 0 for the height and width
					$(this).trigger('resize');
				});

			// Photo Set
			$('.photoset')
				.each(function(index, photoset) {
					var photoset     = $(photoset);
					var images       = photoset.find('.images li'),
						descriptions = photoset.find('.descriptions li')
						left         = photoset.find('.left'),
						right        = photoset.find('.right'),
						in_progress  = false,
						page_links   = photoset.find('.page'),
						show_all     = photoset.find('.show_all'),
						pagination   = photoset.find('.pagination');
					var pages        = Math.ceil(images.length / 3),
						current_page = 1;

					$(window)
						.load(function() {
							var tallest = null;
							images
								.find('img')
									.each(function(_index, img) {
										var img = $(img);
										if(tallest == null) {
											tallest = img;
										} else if(img.height() > tallest.height()) {
											tallest = img
										}
									})
								.end()
								.height(tallest.height())
								.find('img')
									.css('position', 'absolute')
									.css('bottom', '0');
 						});
					

					// Lightbox
					images.find('a').lightBox({
						imageLoading  : THEME_STATIC_URL + '/img/jquery-lightbox/lightbox-ico-loading.gif',
						imageBtnClose : THEME_STATIC_URL + '/img/jquery-lightbox/lightbox-btn-close.gif',
						imageBtnPrev  : THEME_STATIC_URL + '/img/jquery-lightbox/lightbox-btn-prev.gif',
						imageBtnNext  : THEME_STATIC_URL + '/img/jquery-lightbox/lightbox-btn-next.gif'
					});

					// Hide images on pages greater than 1
					images.filter(':gt(2)').hide();
					descriptions.filter(':gt(2)').hide();

					// Hide pagination if there is only 1 page
					if(pages == 1) {
						photoset.find('.pagination,.show_all').css('visibility', 'hidden');
					}

					// Set first page as active
					photoset.find('.page:first').addClass('active');

					// Hide pages greater than 3. They'll be rotated in on click
					photoset.find('.page:gt(2)').hide();

					function activate_current_page() {
						photoset
							.find('.page').removeClass('active').end()
							.find('.page:eq(' + (current_page - 1) + ')').addClass('active');
					}

					right
						.click(function(event) {
							event.preventDefault();
							if(!in_progress && current_page != pages) {
								in_progress = true;
								var range_start = (current_page - 1) * 3,
									range_end   = current_page * 3;
								var hide_images = images.slice(range_start, range_end),
									show_images = images.slice(range_end, range_end + 3),
									hide_descriptions = descriptions.slice(range_start, range_end),
									show_descriptions = descriptions.slice(range_end, range_end + 3);

								$.merge(hide_images,hide_descriptions)
									.fadeOut('slow', function() {
										$.merge(show_images, show_descriptions)
											.fadeIn('slow', function() {
												in_progress = false;
											});
									});

								current_page += 1;
								activate_current_page();

								// If this page is at the right edge of the pagination
								// page listing and it's not the last page of images,
								// rotate the page listing to the right
								if( (current_page % 3) == 0 && current_page != pages) {
									photoset
										.find('.page:visible:first').hide().end()
										.find('.page:eq('+ current_page + ')').show();
								}
							}
						});
					left
						.click(function(event) {
							event.preventDefault();
							if(!in_progress && current_page != 1) {
								in_progress = true;
								var range_end   = (current_page - 1) * 3,
									range_start = (current_page - 2) * 3;
								var hide_images = images.slice(range_end, range_end + 3),
									show_images = images.slice(range_start, range_end),
									hide_descriptions = images.slice(range_end, range_end + 3),
									show_descriptions = images.slice(range_start, range_end);

								$.merge(hide_images, hide_descriptions)
									.fadeOut('slow', function() {
										$.merge(show_images, show_descriptions)
											.fadeIn('slow', function() {
												in_progress = false;
											});
									});

								current_page -= 1;
								activate_current_page();
								// If the next page to the left is at the left edege of the
								// pagination page listing and it's not the first page,
								// rotate the page listing to the left
								if( ((current_page + 1) % 3) == 0 && current_page != 1) {
									photoset
										.find('.page:visible:last').hide().end()
										.find('.page:eq('+ (current_page - 2) + ')').show();
								}
							}
						});
					page_links
						.click(function() {
							var page_num = photoset.find('.page').index($(this)) + 1;
							if(!in_progress && page_num != current_page) {
								in_progress = true;
								var range_end   = page_num * 3,
									range_start = (page_num - 1) * 3,
									going_left  = page_num < current_page ? true : false;
								$.merge(images, descriptions)
									.filter(':visible')
										.fadeOut('slow', function() {
											$.merge(
												images.slice(range_start, range_end),
												descriptions.slice(range_start, range_end)
											).fadeIn('slow', function() {
												in_progress = false;
											});
										});
								current_page = page_num;
								activate_current_page();
								if(going_left && ((current_page + 1) % 3) == 0 && current_page != 1) {
									photoset
										.find('.page:visible:last').hide().end()
										.find('.page:eq('+ (current_page - 2) + ')').show();
								} else if( (current_page % 3) == 0 && current_page != pages) {
									photoset
										.find('.page:visible:first').hide().end()
										.find('.page:eq('+ current_page + ')').show();
								}
							}

						});

					// Hide the show all link if there is only 1 page of images
					if(images.length <= 3) {
						show_all.hide();
					}

					show_all
						.click(function(event) {
							event.preventDefault();

							if($(this).text() == 'Show All') { // Show the rest of the images
								images.show();
								descriptions.show();
								$(this).text('Hide All');
								photoset.find('.pagination').hide();
								photoset.find('.descriptions:not(:last)').css('margin-bottom', '50px');
							} else { // Hide everything except the first page
								images.filter(':gt(2)').hide();
								descriptions.filter(':gt(2)').hide();
								current_page = 1;
								page_links
									.filter(':lt(2)').show().end()
									.filter(':gt(2)').hide();
								activate_current_page();
								photoset.find('.pagination').show();
								$(this).text('Show All');
								photoset.find('.descriptions').css('margin-bottom', '0');
							}
						});
				});

				// Hide stories until `View More Stories` is clicked
				$('.stories > li:gt(5)').hide();
				$('.more-stories')
					.click(function(event) {
						event.preventDefault();
						$(this).prev('ul').find('li').show();
						$(this).hide();
					});

				if(navigator.userAgent.match(/iPad/i)) {
					$('#feature-wrap')
						.css('width', '100%')
						.css('height', '100%')
						.css('left', '0')
						.css('top', '0');
					$('#header #header-menu li').css('margin-left', '-6px');

				};
				if(ipad) {
					if($('#front-page').length) {
						$('#feature-wrap img').wrap('<span />');
					}
					
					function on_orientation_change() {
						if(orientation == '0' || orientation == '180') {
							$('#UCFHBHeader div.UCFHBWrapper').width('768px');
							$('body').scrollLeft(0)
							$('#blueprint-container').width('768px');
							$('#header-wrap.front-page').width('768px');
							if(!$('#front-page').length) {
								$('body').css('zoom', '.65');
							}
						} else {
							$('#UCFHBHeader div.UCFHBWrapper').width('974px');
							$('#blueprint-container').width('950px');
							$('#header-wrap.front-page').width('100%');
							if(!$('#front-page').length) {
								$('body').css('zoom', '1');
							}
						}
					}
					$(window).bind('orientationchange', on_orientation_change);
					on_orientation_change();
				}
		}