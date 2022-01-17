function () {
			var $lch3, $o, hlinks, hlinks_same, hlinks_other, $this, target;

			// Identify whether or not the device supports JavaScript and has a touchscreen
			$('html').removeClass('no-js').addClass(pe.theme + ((pe.touchscreen) ? ' touchscreen' : ''));

			// Get the query parameters from the URL
			pe.urlquery = pe.url(document.location).params;

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

				// Replace hash with ?hashtarget= for links to other pages
				hlinks_other.each(function () {
					var url = pe.url($this.attr('href'));
					$this = $(this);
					if (($this.attr('data-replace-hash') === undefined && (url.hash.length > 0 && window.location.hostname === url.host)) || ($this.attr('data-replace-hash') !== undefined && $this.attr('data-replace-hash') === true)) {
						$this.attr('href', url.removehash() + (url.params.length > 0 ? "&amp;" : "?") + 'hashtarget=' + url.hash);
					}
				});

				$(document).on("pageinit", function () {
					// On click, puts focus on and scrolls to the target of same page links
					hlinks_same.off("click vclick").on("click vclick", function () {
						$this = $($(this).attr("href"));
						$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
						if ($this.length > 0) {
							$.mobile.silentScroll(pe.focus($this).offset().top);
						}
					});

					// If hashtarget is in the query string then put focus on and scroll to the target
					if (pe.urlquery.hashtarget !== undefined) {
						target = pe.main.find('#' + pe.urlquery.hashtarget);
						target.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
						if (target.length > 0) {
							setTimeout(function () {
								$.mobile.silentScroll(pe.focus(target).offset().top);
							}, 0);
						}
					}
				});
				pe.add.css([pe.add.themecsslocation + 'jquery.mobile' + pe.suffix + '.css']);
				pe.add._load([pe.add.liblocation + 'jquery.mobile/jquery.mobile.min.js']);
			} else {
				// On click, puts focus on the target of same page links (fix for browsers that don't do this automatically)
				hlinks_same.on("click vclick", function () {
					$this = $($(this).attr("href"));
					$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
					if ($this.length > 0) {
						pe.focus($this);
					}
				});

				// Puts focus on the target of a different page link with a hash (fix for browsers that don't do this automatically)
				if (window.location.hash.length > 0) {
					$this = $(window.location.hash);
					$this.filter(':not(a, button, input, textarea, select)').attr('tabindex', '-1');
					if ($this.length > 0) {
						pe.focus($this);
					}
				}
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
				$(document).on("languageloaded", function () {
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

			pe.polyfills();
		}