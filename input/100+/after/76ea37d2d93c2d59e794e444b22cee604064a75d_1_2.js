function(type, element) {
	var self = this;
	var data = this.config.get("identityManager." + type);
	if (!data || !this.user.get("sessionID")) return element.hide();

	if (data.type == "script") {
		return element.click(function() {
			$.getScript(self._appendSessionID(data.url));
		});
	} else {
		return element.fancybox({
			"autoScale": false,
			"height": data.height,
			"href": self._appendSessionID(data.url),
			"onClosed": function() {
				// remove dynamic height/width calculations for overlay
				if ($.browser.msie && document.compatMode != "CSS1Compat") {
					var style = $("#fancybox-overlay").get(0).style;
					style.removeExpression("height");
					style.removeExpression("width");
				}
			},
			"onComplete": function() {
				// set fixed dimensions of the frame (for IE in quirks mode it should be smaller)
				var delta = ($.browser.msie && document.compatMode != "CSS1Compat" ? 40 : 0);
				$("#fancybox-frame").css({
					"width": data.width - delta,
					"height": data.height - delta
				});
			},
			"onStart": function() {
				Backplane.expectMessages("identity/ack");
				// dynamical calculation of overlay height/width
				if ($.browser.msie && document.compatMode != "CSS1Compat") {
					var style = $("#fancybox-overlay").get(0).style;
					style.setExpression("height", "Math.max(document.body.clientHeight, document.body.scrollHeight)");
					style.setExpression("width", "Math.max(document.body.clientWidth, document.body.scrollWidth)");
				}
			},
			"padding": 0,
			"scrolling": "no",
			"transitionIn": "elastic",
			"transitionOut": "elastic",
			"type": "iframe",
			"width": data.width
		});
	}
}