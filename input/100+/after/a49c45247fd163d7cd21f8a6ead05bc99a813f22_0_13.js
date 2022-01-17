function(c) {
		var maxLength = limits.reTitle;
		if (!c.title) {
			maxLength = limits.reLink;
			c.title = c.uri.replace(/^https?:\/\/(.*)/ig, '$1');
		}
		if (c.title.length > maxLength) {
			c.title = c.title.substring(0, maxLength) + "...";
		}
		return "<div>" + Echo.Utils.hyperlink({
			"class": "echo-primaryColor",
			"href": c.uri,
			"caption": "Re: " + Echo.Utils.stripTags(c.title)
		}, {
			"openInNewWindow": openLinksInNewWindow
		}) + "</div>";
	}