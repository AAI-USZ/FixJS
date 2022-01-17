function (todo, err) {
					expect(todo.id.length).to.equal(16)
					expect(todo.title).to.equal('faux')
					expect(err).to.not.exist
					done()
				}