function () {
					s.close()
					assert.equal(error.reason, "socket hang up")
					done()
				}