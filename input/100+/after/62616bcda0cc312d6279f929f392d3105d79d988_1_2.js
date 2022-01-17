function () {
			var $lch3, $o, hlinks, hlinks_same, hlinks_other;

			// Identify whether or not the device supports JavaScript and has a touchscreen
			$('html').removeClass('no-js').addClass(pe.theme + ((pe.touchscreen) ? ' touchscreen' : ''));

			hlinks = pe.main.find("a[href*='#']");
			hlinks_other = hlinks.filter(":not([href^='#'])"); // Other page links with hashes
			hlinks_same = hlinks.filter("[href^='#']"); // Same page links with hashes

			// Is this a mobile device?
			if (pe.mobilecheck()) {
				pe.mobile = true;
				$('body > div').attr('data-role', 'page');

				$(document).on("mobileinit", function () {
					$.extend($.mobile, {
						ajaxEnabled: false,
						pushStateEnabled: false,
						autoInitializePage: false
					});
				});
				$(document).on("pageinit", function () {
					// Remove the hash for links to other pages
					hlinks_other.each(function () {
						$(this).attr('href', pe.url($(this).attr('href')).removehash());
					});

					// Handles same page links
					hlinks_same.off("click vclick").on("click vclick", function () {
						var $this = $($(this).attr("href"));
						$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
						if ($this.length > 0) {
							$.mobile.silentScroll(pe.focus($this).offset().top);
							//location.hash = $(this).attr('href');
						}
					});
				});
				pe.add.css([pe.add.themecsslocation + 'jquery.mobile' + pe.suffix + '.css']);
				pe.add._load([pe.add.liblocation + 'jquery.mobile/jquery.mobile.min.js']);
			} else {
				// Move the focus to the anchored element for skip nav links
				/*$("#wb-skip a").on("click", function () {
					pe.focus($($(this).attr("href")).attr("tabindex", "-1"));
				});*/
				hlinks_same.on("click vclick", function () {
					var $this = $($(this).attr("href"));
					$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
					if ($this.length > 0) {
						pe.focus($this).offset().top;
					}
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