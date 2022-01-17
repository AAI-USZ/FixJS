function (done) {
      // console.log(p.atok._rules)
        function handler (token, idx, type) {
          err = new Error('Handler should not be called')
        }

        p.on('data', handler)
        p.write('abc)def')
        assert.equal(p.atok.offset, 0)
        done(err)
      }