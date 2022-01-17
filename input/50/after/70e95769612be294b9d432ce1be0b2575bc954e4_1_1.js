function () {
					s.close()
					assert.equal(error.reason, "socket hang up")
					assert.equal(/request timed out$/.test(error.message), true)
					done()
				}