function loadSite(address, callback) {
	var t = Date.now();

	var page = require('webpage').create(),
		t, address;

	pages.push(page);

	page.open(address, function(status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec on client ' + clinetNr);
			resTimes.push(t);
		}

		callback.apply();
	});

	page.onCallback = function(data, time) {
		var time = Date.now() - time;
		console.log("Received by the 'phantom' main context: " + data + " time for socket " + time);
		nrOfMessages--;
		socketTimes.push(time);

		if(nrOfMessages == 0 && haveSentAllMessages){
			initialKillProcess();
		}
	};

	page.onError = function(msg, trace) {
		numberOfErrors++;

		if(msg == "ReferenceError: Can't find variable: ss"){
			nrOfMessages--;
		}

		console.log(msg);
		trace.forEach(function(item) {
			console.log('  ', item.file, ':', item.line);
		})
	}

	page.onConsoleMessage = function(msg) {
		console.log(msg);
		if(msg == "Connection down :-(") {
			initialKillProcess();
		}
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