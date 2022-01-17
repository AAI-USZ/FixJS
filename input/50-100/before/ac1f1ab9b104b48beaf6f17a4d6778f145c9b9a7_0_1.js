function () {
				for (var i = 0; i < arguments.length; i++) {
					var scriptEl = doc.createElement('script');
					scriptEl.src = window.Worker.baseURI + arguments[i];
					scriptEl.type = 'text/javascript';
					doc.body.appendChild(scriptEl);
				}
			}