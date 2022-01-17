function()
	{
		if (window != window.top) {
			return; /* ignore the settings page if it's in a frame */
		}

		var match = window.location.href.match(this.forward);

		if (match) {

			wot.prefs.get("partner", function(n, partner){

				wot.partner = partner;
				/* redirect to the correct settings language and version */
				var section = match[wot.settings.match];

				/* make sure we have set up authentication cookies */
				wot.bind("my:ready", function() {
					 var loc = wot.urls.settings + "/" +
						wot.i18n("lang") + "/" + wot.platform + "/" + wot.version +
						(wot.partner ? "/" + wot.partner : "") +
						(section ? "/" + section : "");

					loc += (wot.partner ? "#ratings" : ""); // fix for a bug "empty settings tab if partner is set"

					window.location.href = loc;
				});
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