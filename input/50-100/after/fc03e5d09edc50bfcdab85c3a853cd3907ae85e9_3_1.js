function()
	{
		var lang = (window.navigator.language || "en").replace(/-/g, "_");

		lang = "ru"; // TODO: remove this!

		if (!this.languages[lang]) {
			lang = lang.replace(/_.*$/, "");
		}

		wot.language = this.languages[lang] || "en";
		wot.log("wot.locale.setlocale: selected " + wot.language + "\n");

		this.loadlocale(function() {
			wot.locale.ready(true);
		});
	}