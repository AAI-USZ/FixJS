function()
	{
		try {
			/* messages */

			wot.use_popover = !!safari.extension.createPopover;

			if(wot.use_popover) {
				wot.bind("prefs:set", function(name, value) {
					var upds = wot.popover.contentWindow.wot.ratingwindow.update_settings;
					try {
						upds();
					} catch (e) {
						// it is possible to get exception when window is not inited
						setTimeout(upds, 500);
					}
				});
			}

			wot.bind("message:search:hello", function(port, data) {
				wot.core.processrules(data.url, function(rule) {
					port.post("process", { url: data.url, rule: rule });
				});
			});

			wot.bind("message:search:get", function(port, data) {
				wot.core.loadratings(data.targets, function(hosts) {
					var ratings = {};

					hosts.forEach(function(target) {
						var obj = wot.cache.get(target) || {};

						if (obj.status == wot.cachestatus.ok ||
							obj.status == wot.cachestatus.link) {
							ratings[target] = obj.value;
						}
					});

					port.post("update", { rule: data.rule, ratings: ratings });
				});
			});

			wot.bind("message:search:openscorecard", function(port, data) {
				var wnd = safari.application.activeBrowserWindow;
				var tab = wnd.openTab("foreground");
				tab.url = wot.contextedurl(wot.urls.scorecard +
					encodeURIComponent(data.target),data.ctx);
			});

			wot.bind("message:my:update", function(port, data) {
				port.post("setcookies", {
					cookies: wot.api.processcookies(data.cookies) || []
				});
			});

			wot.bind("message:update:status", function(port, data) {
				wot.core.update();
			});

			wot.bind("message:rating:finishstate", function(port, data) {
				wot.core.finishstate(data);
			});

			wot.bind("message:rating:navigate", function(port, data) {
				var wnd = safari.application.activeBrowserWindow;
				var tab = wnd.openTab("foreground");
				tab.url = wot.contextedurl(data.url, data.context);
			});

			wot.bind("message:rating:openscorecard", function(port, data) {
				var wnd = safari.application.activeBrowserWindow;
				var tab = wnd.activeTab;
				var host = wot.url.gethostname(tab.url);
				tab = wnd.openTab("foreground");
				tab.url = wot.contextedurl(wot.contewot.urls.scorecard +
					encodeURIComponent(host), data.context);
			});

			wot.bind("message:rating:update", function(port, data) {
				var tab = safari.application.activeBrowserWindow.activeTab;
				var host = wot.url.gethostname(tab.url);

				var time = Date.now();

				/* clean up old entries from our list of recently shown
					ratings */
				for (var i in wot.core.lastshown) {
					if ((time - wot.core.lastshown[i]) > wot.cache.maxage) {
						delete(wot.core.lastshown[i]);
					}	
				}

				/* shown the rating on the page if it hasn't been shown in
					a while */
				if (host && !wot.core.lastshown[host]) {
					wot.core.lastshown[host] = time;

					if (wot.prefs.get("show_rating_frame")) {
						port.post("toggle");
					}
				}
			});

			if(wot.use_popover) {
				/* event handlers */
				safari.application.addEventListener("command", function(e) {
					if (e.command == "showRatingWindow") {
						e.target.showPopover();
					}
					});

				// Instantiate Popover and attach it to all windows-wot-toolbars
				safari.extension.popovers.forEach(function(item) {
					if(item.identifier == "wot_ratewindow") {
						wot.popover = item;
					}
				});

				if(!wot.popover) {
					wot.popover = safari.extension.createPopover("wot_ratewindow",
						safari.extension.baseURI+"content/ratingwindow.html", 335, 490);
				}

				this.attach_popover();


				// Attach popover to a newly created window (toolbar)
				safari.application.addEventListener("open", function(e) {
					// react only if target = SafariBrowserWindow (contains tabs array)
					if(e.target instanceof window.SafariBrowserWindow) {
						wot.core.attach_popover();
					}
				}, true);

				safari.application.addEventListener("validate", function(e) {
					if (e.target.identifier === "wot_button") {

						if(wot.popover) {
							var rw = wot.popover.contentWindow.wot.ratingwindow;
							if(rw && rw.state) {
								wot.core.finishstate({state: rw.state});
							}
						}

						wot.core.update();
					}
				}, false);
			} else {

				// This part is used for old Safari (<5.1) which don't
				// support Popovers feature

				wot.bind("message:rating:togglewindow", function(port, data) {
					port.post("togglewindow");
				});

				/* event handlers */

				safari.application.addEventListener("command", function(e) {
					if (e.command == "showRatingWindow") {
						wot.post("rating", "togglewindow");
					}
				}, false);

				safari.application.addEventListener("validate", function(e) {
					if (e.command == "showRatingWindow") {
						wot.core.update();
					}
				}, false);
			}

			wot.listen([ "search", "my", "update", "rating" ]);

			if (wot.debug) {
				wot.prefs.clear("update:state");

				wot.bind("cache:set", function(name, value) {
					wot.flog("cache.set: " + name + " = " +
						JSON.stringify(value));
				});

				wot.bind("prefs:set", function(name, value) {
					wot.flog("prefs.set: " + name + " = " +
						JSON.stringify(value));
				});
			}

			/* initialize */
			wot.api.register(function() {

				if(!wot.use_popover) {
					wot.core.update();
				}

				if (wot.api.isregistered()) {
					wot.api.setcookies();
					wot.api.update();
					wot.api.processpending();
				}
			});

			wot.cache.purge();


		} catch (e) {
			wot.flog("core.onload: failed with " + e);
		}
	}