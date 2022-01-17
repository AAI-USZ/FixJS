function (msg, trace) {
		numberOfErrors++;
		console.log(msg);
		trace.forEach(function(item) {
			console.log('  ', item.file, ':', item.line);
		})
	}