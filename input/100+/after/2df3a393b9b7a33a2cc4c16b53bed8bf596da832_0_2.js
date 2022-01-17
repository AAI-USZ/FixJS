function() {
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
	}