function(status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec');
			times.push(t);
		}

		callback.apply();
	}