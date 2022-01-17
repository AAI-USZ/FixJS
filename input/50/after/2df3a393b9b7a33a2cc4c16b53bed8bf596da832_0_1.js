function(test) {
		write(color('pending', '.'))
		pendingTests.push(test)
		allTests.push(test)
	}