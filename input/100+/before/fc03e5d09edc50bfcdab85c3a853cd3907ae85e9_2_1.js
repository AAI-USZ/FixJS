function(data, reason)
	{
		/* Obviously, this isn't exactly foolproof. A site might have
			elements with a higher z-index, or it might try to remove
			our layer... */

		try {
			if (!data.target || document.getElementById("wotwarning")) {
				return;
			}

			var accessible = this.settings.accessible ? "accessible" : "";

			var replaces = [
				{
					from: "TITLE",
					to: (data.decodedtarget || "").replace(/[<>&="']/g, "")
				}, {
					from: "LANG",
					to: wot.i18n("lang")
				}, {
					from: "INFO",
					to: wot.i18n("warnings", "information")
				}, {
					from: "RATETEXT",
					to: wot.i18n("warnings", "ratesite")
				}, {
					from: "GOTOTEXT",
					to: wot.i18n("warnings", "gotosite")
				}, {
					from: "ACCESSIBLE",
					to: accessible
				}
			];

			wot.components.forEach(function(item) {

				var cachedv = data.cached.value[item.name];

				var level = wot.getlevel(wot.reputationlevels,
								(cachedv && cachedv.r != null) ? cachedv.r : -1);

				replaces.push({
					from: "RATINGDESC" + item.name,
					to: wot.i18n("components", item.name)
				});
				replaces.push({
					from: "RATING" + item.name,
					to: level.name
				});
				replaces.push({
					from: "RATINGEXPL" + item.name,
					to: wot.i18n("reputationlevels", level.name) || "&nbsp;"
				});
			});

			var warnclass = "";

			if (this.getheight() < this.minheight) {
				warnclass = "wotnoratings";
			}

			if (reason == wot.warningreasons.reputation) {
				replaces.push({ from: "CLASS", to: warnclass });
				replaces.push({ from: "DESCCLASS", to: "wotlongdescription" });
				replaces.push({
					from: "DESC",
					to: wot.i18n("warnings", "reputation")
				});
			} else if (reason == wot.warningreasons.rating) {
				replaces.push({ from: "CLASS", to: "wotnoratings" });
				replaces.push({ from: "DESCCLASS", to: "wotlongdescription" });
				replaces.push({
					from: "DESC",
					to: wot.i18n("warnings", "rating")
				});
			} else {
				replaces.push({ from: "CLASS", to: warnclass });
				replaces.push({ from: "DESCCLASS", to: "" });
				replaces.push({
					from: "DESC",
					to: wot.i18n("warnings", "unknown")
				});
			}

			if (reason != wot.warningreasons.unknown) {
				replaces.push({
					from: "HEADLINE",
					to: safari.extension.baseURI + wot.getlocalepath("warning.png")
				});
			}

			var head = document.getElementsByTagName("head");
			var body = document.getElementsByTagName("body");

			if (!head || !head.length || !body || !body.length) {
				return;
			}

			var style = document.createElement("style");

			if (!style) {
				return;
			}

			style.setAttribute("type", "text/css");
			style.innerText = "@import \"" +
				safari.extension.baseURI + wot.getincludepath("warning.css") +
					"\";";

			head[0].appendChild(style);

			var warning = document.createElement("div");
			var wrapper = document.createElement("div");

			if (!warning || !wrapper) {
				return;
			}

			warning.setAttribute("id", "wotwarning");

			if (this.settings.warning_opacity &&
					Number(this.settings.warning_opacity) >= 0 &&
					Number(this.settings.warning_opacity) <= 1) {
				warning.setAttribute("style", "opacity: " +
					this.settings.warning_opacity + " ! important;");
			}

			wrapper.setAttribute("id", "wotwrapper");

			warning = body[0].appendChild(warning);
			wrapper = body[0].appendChild(wrapper);

			wrapper.innerHTML = this.processhtml(WOT_WARNING_HTML, replaces);
			this.hideobjects(true);

			document.getElementById("wotinfobutton").addEventListener("click",
				function() {
					var url = wot.urls.scorecard + encodeURIComponent(data.target);
					window.location.href = wot.contextedurl(url, wot.urls.contexts.warnviewsc);
				}, false);

			document.getElementById("wotratebutton").addEventListener("click",
				function() {
					var url = wot.urls.scorecard +
						encodeURIComponent(data.target) + "/rate";
					window.location.href = wot.contextedurl(url, wot.urls.contexts.warnrate);
				}, false);

			document.getElementById("wotgotobutton").addEventListener("click",
				function() {
					wot.warning.hide();
					wot.warning.hideobjects(false);
					wot.post("cache", "setflags", {
						target: data.target,
						flags: { warned: true, warned_expire: null }
					});
				}, false);
		} catch (e) {
			console.log("warning.add: failed with " + e);
		}
	}