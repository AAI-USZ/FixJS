function (err, result) {
			if (err) {throw err;}
			test.equal(result[0].hello, payload, 'what goes in, should come out');
			test.done();
		}