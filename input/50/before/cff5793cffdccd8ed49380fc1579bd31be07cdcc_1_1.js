function (err, result) {
			test.equal(result[0].hello, payload, 'what goes in, should come out');
			test.done();
		}