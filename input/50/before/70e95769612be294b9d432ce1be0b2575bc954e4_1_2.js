function () {
					s.close()
					assert.equal(error.reason, "aborted")
					done()
				}