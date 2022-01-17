function runOnAll() {
	for (var z = 0; z < pages.length; z++) {
		try {
			pages[z].evaluate(function() {
				var ssAppName = 'demo';
				var ssFuncToTest = 'LoadTest';
				ss.rpc(ssAppName + '.' + ssFuncToTest);
			});
		} catch (e) {
			console.log(e);
		}
	}
}