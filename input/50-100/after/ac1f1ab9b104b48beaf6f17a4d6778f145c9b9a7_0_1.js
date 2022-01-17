function () {
				for (var i = 0; i < arguments.length; i++) {
					injectScript(window.Worker.baseURI + arguments[i]);
				}
			}