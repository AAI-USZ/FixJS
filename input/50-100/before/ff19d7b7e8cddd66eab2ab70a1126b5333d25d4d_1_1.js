function (data) {
		console.log('Loading ' + key);

		for (var i in data.reverse()) {
			if(data[i].key == key) {
				cb(data[i].val);
			}
		}

		cb('failed');
	}