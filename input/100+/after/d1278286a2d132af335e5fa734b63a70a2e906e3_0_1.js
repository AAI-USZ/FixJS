function phantomTestRunnerTask(command, params) {
	var phantom_task = require('child_process').execFile(command, params);

	phantom_task.stderr.on('data', function (data) {
		fail( data );
	});

	phantom_task.stdout.on('data', function (data) {
		console.log( data );
	});

	phantom_task.on('exit', function (code, signal) {
		if (code === 0) {
			complete();
			return;
		}

		fail('PhantomTask exited with code ' + code);
	});

}