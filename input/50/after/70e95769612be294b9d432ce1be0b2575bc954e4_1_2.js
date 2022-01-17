function () {
					s.close()
					assert.equal(error.reason, "aborted")
					assert.equal(/response timed out$/.test(error.message), true)
					done()
				}