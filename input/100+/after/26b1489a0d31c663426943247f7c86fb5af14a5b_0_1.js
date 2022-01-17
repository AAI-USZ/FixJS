function runCmd(cmd, args, callback) {

	var childProcess = spawn(cmd, args);

	childProcess.stdout.on('data', function (data) {

		console.log(data+"");

	});

	childProcess.stderr.on('data', function (data) {

		console.log(data+"");

	});

	childProcess.on('exit', function (code) {

		// TODO: When packman issue 7 will be implemented, we will have real exit codes to deal with failing packages

		// https://github.com/captainbrosset/packman/issues/7

		if(code === 1) {

			process.exit(1);

		} else {

			callback(code);

		}

	});

}