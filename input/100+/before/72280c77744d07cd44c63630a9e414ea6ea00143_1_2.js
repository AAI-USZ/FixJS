function loadSite(address, callback) {
	t = Date.now();

	var page = require('webpage').create(),
		t, address;

	pages.push(page);

	page.open(address, function(status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec');
			times.push(t);
		}

		callback.apply();
	});

	page.onError = function (msg, trace) {
		numberOfErrors++;
		console.log(msg);
		trace.forEach(function(item) {
			console.log('  ', item.file, ':', item.line);
		})
	}
		
	page.onConsoleMessage = function(msg) {
		console.log(msg);
	};

/*
	page.onResourceRequested = function (request) {
	   	console.log('Request ' + JSON.stringify(request, undefined, 4));
	};

	page.onResourceReceived = function (response) {
		console.log('Receive ' + JSON.stringify(response, undefined, 4));
	};
*/
}