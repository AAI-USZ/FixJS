function injectScript(script, callback) {
				var scriptEl = doc.createElement('script');
				scriptEl.src = script;
				scriptEl.type = 'text/javascript';
				scriptEl.onload = scriptEl.onreadystatechange = function () {
					if (scriptEl.readyState && scriptEl.readyState !== "loaded" && scriptEl.readyState !== "complete") return;
					scriptEl.onload = scriptEl.onreadystatechange = null;
					doc.body.removeChild(scriptEl);
					scriptEl = null;
					if (callback) {
						callback();
					}
				};
				doc.body.appendChild(scriptEl);
			}