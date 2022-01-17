function $_addScript  (scriptSource) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.textContent = localStorage.getItem(scriptSource);
			document.head.appendChild(script);
		}