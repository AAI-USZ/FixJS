function(pe){
	    	new Ajax.Request("builder.crc32", {
				method: "get",
				requestHeaders: {
					"If-Modified-Since": (new Date(Builder.dold)).toGMTString(),
					"If-None-Match": Builder.detag 
				}, 
				onSuccess: function(req) {
					var date = new Date(req.getHeader("Last-Modified"));
					var dnew = date.getTime();
					if (dnew > Builder.dold) {
						Builder.dold = dnew;
						Builder.detag = req.getHeader("Etag");
						// fetch new content
						var obj = eval("("+req.responseText+")");
						/*
						 * obj array will look like:
						 * {"h_html_9":  {"user": "Testuser", "uid": "9584737"},
						 *  "m_js_6": 121232345
						 * }
						 */
						$$(".blockable").each(function(item) {
							if (item.up().hasClassName("dirty") && (!obj[item.up().id] || obj[item.up().id].user != window.user)) {
								Builder.enableBespin(item.up().id);
								item.title = "";
								item.up().removeClassName("dirty");
								// reload editor content
								Builder.refreshBespin(item.up().id, obj[item.up().id] && obj[item.up().id].user);
							} else if (obj[item.up().id] && !item.up().hasClassName("dirty") && obj[item.up().id].user != window.user) {
								item.title = 'Currently being modified by '+obj[item.up().id].user;
								item.up().addClassName("dirty");
							}
						});
					}
				}
			});
	    }