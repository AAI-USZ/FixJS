function multiline(runner) {
	var fails = []
	  , allTests = []
	  , greenTests = []
	  , pendingTests = []

	runner.on('start', function() {
		write('\n')
	})
	runner.on('pending', function(test) {
		write(color('pending', '.'))
		pendingTests.push(test)
		allTests.push(test)
	})
	runner.on('pass', function(test) {
		greenTests.push(test)
		allTests.push(test)
		if(test.speed == 'slow') {
			write(color('bright yellow', '.'))
		} else {
			write('.')
		}
	})
	runner.on('fail', function(test, err) {
		test.err = err
		allTests.push(test)
		fails.push(test)

		write(color('fail', '.'))
	})

	runner.on('end', function() {
		write('\n\n')
		if(!fails.length) {
			write(color('green', '%s tests passed\n'), greenTests.length)
			if(pendingTests.length) {
				write(color('pending', '%s tests pending\n'), pendingTests.length)
			}
			return
		}

		write(color('fail', ' %s of %s tests failed.\n'), fails.length, allTests.length)
		fails.forEach(function(test, idx) {
			write('\n\n%s ) %s:\n', idx+1, test.fullTitle())
			write(color('fail', formatter(test.err.toString())))
		})
		write('\n')
	})
}