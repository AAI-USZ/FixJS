function() {


	var injectScript, injectStylesheet, assetsDomain = 'http://impressjs.herokuapp.com/';

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

	injectStylesheet(assetsDomain + 'stylesheets/remote.css');

	injectScript(assetsDomain + 'socket.io/socket.io.js', function() {
		injectScript(assetsDomain + 'javascripts/remote.js');
	});
}