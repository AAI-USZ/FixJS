function () {
			var $lch3, $o, hlinks, hlinks_same, hlinks_other;

			// Identify whether or not the device supports JavaScript and has a touchscreen
			$('html').removeClass('no-js').addClass(pe.theme + ((pe.touchscreen) ? ' touchscreen' : ''));

			// Is this a mobile device?
			if (pe.mobilecheck()) {
				pe.mobile = true;
				$('body > div').attr('data-role', 'page');

				hlinks = pe.main.find("a[href*='#']");
				hlinks_other = hlinks.filter(":not([href^='#'])"); // Other page links with hashes
				hlinks_same = hlinks.filter("[href^='#']"); // Same page links with hashes

				// Remove the hash for links to other pages
				hlinks_other.each(function () {
					$(this).attr('href', pe.url($(this).attr('href')).removehash());
				});

				// Move the focus to the anchored element for same page content area links
				//hlinks_same.on("click vclick", function () {
					/* Option 1 - Doesn't really work on iOS or BB */
					/*var $this = $($(this).attr("href") + ":not(a[href], ul.tabs a, input, button, textarea)");
					if ($this.length > 0) {
						$.mobile.silentScroll(pe.focus($this.attr("tabindex", "-1")).offset().top);
					}*/
					/* */
					/* Option 2 - Leaves hash in URL so problematic on refresh */
			        //location.hash = $(this).attr('href');
					/* */
					/*
					return false;
				});*/
				/* Option 3 - Use .off("click") after pagecreate or pageinit then add on click vclick */

				$(document).on("mobileinit", function () {
					$.extend($.mobile, {
						ajaxEnabled: false,
						pushStateEnabled: false,
						autoInitializePage: false
					});
				});
				$(document).on("pageinit", function () {
					hlinks_same.off("click vclick");
					hlinks_same.on("click vclick", function () {
						var $this = $($(this).attr("href") + ":not(a[href], ul.tabs a, button)");
						if ($this.length > 0) {
							$.mobile.silentScroll(pe.focus($this).offset().top);
						}
					});
				});
				pe.add.css([pe.add.themecsslocation + 'jquery.mobile' + pe.suffix + '.css']);
				pe.add._load([pe.add.liblocation + 'jquery.mobile/jquery.mobile.min.js']);
			} else {
				// Move the focus to the anchored element for skip nav links
				$("#wb-skip a").on("click", function () {
					pe.focus($($(this).attr("href")).attr("tabindex", "-1"));
				});
			}

			//Load ajax content
			$.when.apply($, $.map($("*[data-ajax-replace], *[data-ajax-append]"), function (o) {
				$o = $(o);
				var replace = false, url;
				if ($o.attr("data-ajax-replace") !== undefined) {
					replace = true;
					url = $o.attr("data-ajax-replace");
				} else if ($o.attr("data-ajax-append") !== undefined) {
					url = $o.attr("data-ajax-append");
				}
				return $.get(url, function (data) {
					if (replace) {
						$o.empty();
					}
					$o.append($(data));
				}, "html");
			})).always(function () {
				//Wait for localisation and ajax content to load plugins
				$(document).bind("languageloaded", function () {
					if (wet_boew_theme !== null) {
						// Initialize the theme
						wet_boew_theme.init();

						//Load the mobile view
						if (pe.mobile === true) {
							if (wet_boew_theme !== null) {
								wet_boew_theme.mobileview();
							}
							$.mobile.initializePage();
						}
					}
					pe.dance();
				});
				pe.add.language(pe.language);
			});

			// add polyfills if necessary;
			pe.polyfills();
		}