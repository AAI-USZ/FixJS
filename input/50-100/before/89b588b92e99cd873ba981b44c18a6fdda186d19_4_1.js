function (done) {
        var i = 0
        p.break(true).continue(0)
        p.addRule('a', function (token, idx, type) {
          i++
          p.addRuleFirst('a', function (token, idx, type) {
          })
        })
        p.break().continue()
        p.write('a')
        p.write('a')
        assert.equal(i, 2)
        done()
      }