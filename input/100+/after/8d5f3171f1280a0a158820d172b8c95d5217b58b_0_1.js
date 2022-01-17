function main() {

	if (phantom.args.length < 2) {
		  console.log('Usage: proxy.js <picture filename or none> <load iframe(true/false)> <URL> <url param count> <url params...>');
		  phantom.exit();
	} else {
		file_name = phantom.args[0];
		var loadIframes = phantom.args[1].match(/true/i) ? true : false;
		address = phantom.args[2];

		var argCount = phantom.args[3];

		args = ""

		for (var i=0;i<argCount;i++)
			args += phantom.args[i+4]+'&';
		if (args.length > 0)
			address += '?'+args;

		console.log("Open page: "+address+", "+args+" END");

		var page = require('webpage').create();

		page.onConsoleMessage = function (msg) { console.log(msg); };

		console.log('start openning page');

		masterURL = address;
		
		//catches status != 200 and throws error immidiatly
		page.onResourceReceived = function (response) {
			if (response.stage == "end" && response.url == address && response.status != 200)
			{
				console.log('FAILED_LOADING_URL: '+response.status);
				phantom.exit();
			}
		};

		page.open(address, function (status) {
			if (status !== 'success') {
				console.log('FAILED_LOADING_URL');
			} else {
				console.log('DONE_LOADING_URL');
				//load iframes into page
				if (loadIframes) {
					loadIFrames(page);
				}
				//evaluateWithVars(page, function(){}, phantom.args);
				console.log('PHANTOMJS_MAINDOM_WRITE:'+page.content);
				console.log('PHANTOMJS_MAINDOM_END');
			}
			if (file_name != null && file_name != "none") {
				page.render(file_name);
			}
			exit();
		});
	}
}