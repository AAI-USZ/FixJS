function (message, callback) {

		if (message == 'HEADER_HIDDEN') {

			core.adjustMagnifyingLensPosition();

			core.adjustClearSearchPosition();

		}

		

		if (callback) callback();

	}