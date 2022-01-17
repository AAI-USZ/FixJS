function (amount) {
			if (amount === 0) {
				message = 'Build fixed';
				details = 'Build 123 fixed';
			} else {
				message = 'Build failed';
				details = 'Build 123 failed';
			}
			failedBuildsCount = amount;
			return this;
		}