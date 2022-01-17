function () {
						if (typeof head.item !== "undefined") { // check if ref is still a live node list
							if (!head[0]) { // append_to node not yet ready
								setTimeout(arguments.callee, 25);
								return;
							}
							head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
						}
						var scriptElem = document.createElement("script"),
							scriptdone = false;
						pe.add.set(scriptElem, 'async', 'async');
						scriptElem.onload = scriptElem.onreadystatechange = function () {
							if ((scriptElem.readyState && scriptElem.readyState !== "complete" && scriptElem.readyState !== "loaded") || scriptdone) {
								return false;
							}
							scriptElem.onload = scriptElem.onreadystatechange = null;
							scriptdone = true;
							// now add to dependency list
							pe.depends.put(js);
							$(document).trigger({type: 'wet-boew-dependency-loaded', js: js});
						};
						scriptElem.src = js;
						if ((pe.ie > 0 && pe.ie < 9) || !head.insertBefore) {
							$(scriptElem).appendTo($(head)).delay(100);
						} else {
							head.insertBefore(scriptElem, head.firstChild);
						}
					}