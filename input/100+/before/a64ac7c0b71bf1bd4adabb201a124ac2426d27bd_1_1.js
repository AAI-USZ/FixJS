function()
	{
		if (window != window.top) {
			return; /* ignore the settings page if it's in a frame */
		}

		var match = window.location.href.match(this.forward);

		if (match) {
			/* redirect to the correct settings language and version */
			var section = match[this.match];

			/* make sure we have set up authentication cookies */
			wot.bind("my:ready", function() {
				window.location.href = wot.urls.settings + "/" +
					wot.i18n("lang") + "/" + wot.platform + "/" + wot.version +
					((section) ? "/" + section : "");
			});
		} else if (this.trigger.test(window.location.href)) {
			/* load settings for this page */
			document.addEventListener("DOMContentLoaded", function() {
					wot.settings.load();
				}, false);

			if (document.readyState == "complete") {
				wot.settings.load();
			}
		}
	}