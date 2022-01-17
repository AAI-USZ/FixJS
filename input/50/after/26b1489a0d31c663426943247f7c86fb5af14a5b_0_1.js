function (code) {

		// TODO: When packman issue 7 will be implemented, we will have real exit codes to deal with failing packages

		// https://github.com/captainbrosset/packman/issues/7

		if(code === 1) {

			process.exit(1);

		} else {

			callback(code);

		}

	}