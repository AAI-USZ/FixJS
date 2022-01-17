function() {
console.debug("DEFER START!");
				if (loaded) {
					console.warn("app.js already loaded!");
				} else {
					var n = Math.round(Math.random()*1e12);
					waiting.push(n);
					return function() {
						var p = waiting.indexOf(n);
						~p && waiting.splice(p, 1);
						loaded = 1;
						waiting.length || require(cfg.main || ["app.js"]);
					};
				}
			}