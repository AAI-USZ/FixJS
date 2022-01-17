function() {

	'use strict';

	var injectScript, injectStylesheet, assetsDomain = 'http://impressjs.herokuapp.com/', loadingPanel;

	loadingPanel = function() {
		var body = document.getElementsByTagName("body")[0],
			loadingPanel = document.createElement("div"),
			p = document.getElementById('x-remote-panel');

    if (!p) {
			loadingPanel.id = 'x-remote-panel';
			loadingPanel.innerHTML = "Initilizing Remote";

			loadingPanel.style.position = 'fixed';
			loadingPanel.style.right = '0px';
			loadingPanel.style.bottom = '0px';
			loadingPanel.style.fontWeight = 'bolder';
			loadingPanel.style.padding = '10px';
			loadingPanel.style.background = 'whiteSmoke';
			body.appendChild(loadingPanel);
    }
	};


	injectScript = function(url, callback) {
		var script = document.createElement('script');
		script.src = url;
		script.type = 'text/javascript';

		script.onload = script.onreadystagechange = function() {
			var rs = this.readyState;
			if ((!rs || rs === 'loaded'|| rs === 'complete')) {
				if (typeof callback === 'function') {
					callback();
				}
			}
		};
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
	};

	injectStylesheet = function(url, callback) {
		var cssnode = document.createElement('link');
		cssnode.type = 'text/css';
    cssnode.rel = 'stylesheet';
    cssnode.href = url;

    cssnode.onload = cssnode.onreadystagechange = function() {
			var rs = this.readyState;
			if ((!rs || rs === 'loaded'|| rs === 'complete')) {
				if (typeof callback === 'function') {
					callback();
				}
			}
		};
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(cssnode);
	};

	loadingPanel();

	injectStylesheet(assetsDomain + 'stylesheets/remote.css');

	injectScript(assetsDomain + 'socket.io/socket.io.js', function() {
		injectScript(assetsDomain + 'javascripts/remote.js', function() {
			var p = document.getElementById('x-remote-panel');
			if (p) {
				p.innerHTML = "Assets Loaded. Waiting for connection.";
			}
		});
	});
}