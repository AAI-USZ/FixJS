function () {
			// global plugins
			var i, exclude = ":not(a[href], ul.tabs a, input, button, textarea)",
				settings = (typeof wet_boew_properties !== 'undefined' && wet_boew_properties !== null) ? wet_boew_properties : false;
			$('[class^="wet-boew-"]').each(function () {
				var _node = $(this),
					_fcall = _node.attr("class").split(" "),
					i;
				for (i = 0; i < _fcall.length; i += 1) {
					if (_fcall[i].indexOf('wet-boew-') === 0) {
						_fcall[i] = _fcall[i].substr(9).toLowerCase();
						if (typeof pe.fn[_fcall[i]] !== "undefined") {
							pe._execute(pe.fn[_fcall[i]], _node);
						}
					}
				}
			// lets safeguard the execution to only functions we have
			});
			// globals
			if (settings) {
				// loop throught globals adding functions
				for (i = 0; i < settings.globals.length; i += 1) {
					pe._execute(pe.fn[settings.globals[i]], document);
				}
			}
			if (pe.mobile) {
				// Move the focus to the anchored element for same page content area links
				$("#wb-main a[href^='#']").on("click", function () {
					pe.focus($($(this).attr("href") + exclude).attr("tabindex", "-1"));
				});
			} else {
				// Move the focus to the anchored element for skip nav links
				$("#wb-skip a").on("click", function () {
					pe.focus($($(this).attr("href") + exclude).attr("tabindex", "-1"));
				});
			}
			window.onresize = function () { // TODO: find a better way to switch back and forth between mobile and desktop modes.
				if (pe.mobile !== pe.mobilecheck()) {
					window.location.href = pe.url(window.location.href).removehash();
				}
			};
		}